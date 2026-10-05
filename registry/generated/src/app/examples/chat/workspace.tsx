"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  ArrowUp,
  Check,
  Copy,
  Menu,
  MessageCircle,
  Plus,
  Sparkle,
  Trash,
} from "reicon-react";
import { Avatar } from "../../../components/vip-ui/avatar";
import { Button } from "../../../components/vip-ui/button";
import { Card } from "../../../components/vip-ui/card";
import { SearchField } from "../../../components/vip-ui/search-field";
import {
  TextArea,
  TextAreaInput,
  TextAreaLabel,
} from "../../../components/vip-ui/text-area";
import {
  type Conversation,
  initialConversations,
  type Message,
  replyFor,
  suggestions,
} from "./data";
import { ThemeToggle } from "./theme-toggle";

const storageKey = "vip-ui-chat-example";
const seedVersionKey = "vip-ui-chat-seeds-v2";

export function ChatWorkspace() {
  const [conversations, setConversations] =
    useState<Conversation[]>(initialConversations);
  const [activeId, setActiveId] = useState<string | null>(
    initialConversations[0].id,
  );
  const [draft, setDraft] = useState("");
  const [search, setSearch] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [notice, setNotice] = useState("");
  const composerRef = useRef<HTMLTextAreaElement>(null);
  const historyRef = useRef<HTMLElement>(null);
  const historyToggleRef = useRef<HTMLDivElement>(null);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const parsed: unknown = JSON.parse(saved);
        if (
          Array.isArray(parsed) &&
          parsed.every(
            (item) =>
              item &&
              typeof item.id === "string" &&
              typeof item.title === "string" &&
              Array.isArray(item.messages) &&
              item.messages.every(
                (message: Message) =>
                  typeof message.id === "string" &&
                  typeof message.text === "string" &&
                  (message.role === "user" || message.role === "assistant"),
              ),
          )
        ) {
          // Add the new reading material once without restoring conversations a reader deleted.
          const needsSeeds = localStorage.getItem(seedVersionKey) !== "1";
          const savedConversations: Conversation[] = parsed;
          const refreshed = savedConversations.map((item) =>
            item.id === "welcome" &&
            item.messages.some((message) =>
              message.text.includes("This is a scripted example"),
            )
              ? initialConversations[0]
              : item,
          );
          const merged = needsSeeds
            ? [
                ...refreshed,
                ...initialConversations.filter(
                  (item) =>
                    item.id !== "welcome" &&
                    !refreshed.some((savedItem) => savedItem.id === item.id),
                ),
              ]
            : refreshed;
          setConversations(merged);
          setActiveId(merged[0]?.id ?? null);
        }
      }
      localStorage.setItem(seedVersionKey, "1");
    } catch {
      // Private browsing or invalid saved data: keep the initial conversations.
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(storageKey, JSON.stringify(conversations));
    } catch {
      // The demo still works when storage is unavailable.
    }
  }, [conversations, loaded]);

  const active = conversations.find(
    (conversation) => conversation.id === activeId,
  );
  const filtered = conversations.filter(
    (conversation) =>
      conversation.title.toLowerCase().includes(search.toLowerCase()) ||
      conversation.messages.some((message) =>
        message.text.toLowerCase().includes(search.toLowerCase()),
      ),
  );

  function newChat() {
    setActiveId(null);
    setDraft("");
    setSidebarOpen(false);
    setNotice("New conversation ready");
    requestAnimationFrame(() => composerRef.current?.focus());
  }

  function selectChat(id: string) {
    setActiveId(id);
    setDraft("");
    setSidebarOpen(false);
    setNotice("");
    if (sidebarOpen) requestAnimationFrame(() => composerRef.current?.focus());
  }

  function toggleHistory() {
    setSidebarOpen(!sidebarOpen);
    requestAnimationFrame(() => {
      if (sidebarOpen)
        historyToggleRef.current?.querySelector("button")?.focus();
      else historyRef.current?.querySelector("input")?.focus();
    });
  }

  function send(text = draft) {
    const trimmed = text.trim();
    if (!trimmed) return;
    const id = activeId ?? crypto.randomUUID();
    const messages: Message[] = [
      { id: crypto.randomUUID(), role: "user", text: trimmed },
      { id: crypto.randomUUID(), role: "assistant", text: replyFor(trimmed) },
    ];
    setConversations((current) => {
      const existing = current.find((conversation) => conversation.id === id);
      return [
        {
          id,
          title: existing?.title ?? trimmed.slice(0, 48),
          messages: [...(existing?.messages ?? []), ...messages],
        },
        ...current.filter((conversation) => conversation.id !== id),
      ];
    });
    setActiveId(id);
    setDraft("");
    setNotice("Response added");
    requestAnimationFrame(() =>
      endRef.current?.scrollIntoView({ block: "end" }),
    );
  }

  function deleteChat() {
    if (!activeId) return;
    setConversations((current) =>
      current.filter((conversation) => conversation.id !== activeId),
    );
    setActiveId(null);
    setNotice("Conversation deleted");
    requestAnimationFrame(() => composerRef.current?.focus());
  }

  async function copyMessage(message: Message) {
    try {
      await navigator.clipboard.writeText(message.text);
      setCopiedId(message.id);
      setNotice("Response copied");
    } catch {
      setNotice("Could not copy response");
    }
  }

  return (
    <div className="flex min-h-dvh flex-col bg-background text-foreground md:h-dvh md:overflow-hidden">
      <a
        href="#main"
        className="sr-only fixed start-4 top-4 z-50 rounded-md bg-primary px-4 py-2 text-primary-foreground focus:not-sr-only"
      >
        Skip to conversation
      </a>
      <div className="flex min-h-0 flex-1 flex-col md:flex-row">
        <aside
          id="chat-history"
          ref={historyRef}
          aria-label="Chat history"
          onKeyDown={(event) => {
            if (sidebarOpen && event.key === "Escape") {
              setSidebarOpen(false);
              requestAnimationFrame(() =>
                historyToggleRef.current?.querySelector("button")?.focus(),
              );
            }
          }}
          className={`${sidebarOpen ? "block" : "hidden"} shrink-0 border-b border-border/70 bg-card p-4 md:flex md:w-64 md:flex-col md:border-b-0 md:border-e lg:w-72`}
        >
          <div className="flex items-center justify-between gap-2">
            <Link
              href="/examples/chat"
              className="text-lg font-semibold tracking-[-0.055em]"
            >
              vip<span className="text-primary">/</span>chat
            </Link>
            <Button
              variant="outline"
              size="icon"
              aria-label="New chat"
              onPress={newChat}
            >
              <Plus size={18} aria-hidden="true" />
            </Button>
          </div>
          <div className="mt-6">
            <SearchField
              label="Search conversations"
              placeholder="Search history"
              value={search}
              onChange={setSearch}
            />
          </div>
          <nav
            aria-label="Conversations"
            className="mt-6 min-h-0 overflow-y-auto"
          >
            <p className="mb-3 text-xs font-medium text-muted-foreground">
              Recent chats
            </p>
            {filtered.length ? (
              <ul className="grid gap-1">
                {filtered.map((conversation) => (
                  <li key={conversation.id}>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full min-w-0 justify-start"
                      aria-pressed={activeId === conversation.id}
                      onPress={() => selectChat(conversation.id)}
                    >
                      <MessageCircle size={16} aria-hidden="true" />
                      <span className="truncate">{conversation.title}</span>
                    </Button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted-foreground">
                No matching conversations.
              </p>
            )}
          </nav>
          <div className="mt-auto border-t border-border/70 pt-5 text-xs leading-5 text-muted-foreground">
            Conversations stay in this browser. Replies are prewritten; no AI
            service is connected.
          </div>
        </aside>
        <div className="flex min-w-0 flex-1 flex-col">
          <header className="flex min-h-16 items-center justify-between gap-3 border-b border-border/70 px-4 sm:px-6">
            <div className="flex min-w-0 items-center gap-2">
              <div ref={historyToggleRef} className="md:hidden">
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label={
                    sidebarOpen ? "Close chat history" : "Open chat history"
                  }
                  aria-controls="chat-history"
                  aria-expanded={sidebarOpen}
                  onPress={toggleHistory}
                >
                  <Menu size={19} aria-hidden="true" />
                </Button>
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold">
                  {active?.title ?? "New conversation"}
                </p>
                <p className="text-xs text-muted-foreground">
                  Offline workspace
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Link
                href="/examples"
                className="text-xs font-medium text-muted-foreground underline-offset-4 hover:text-foreground hover:underline focus-visible:outline-2 focus-visible:outline-ring"
              >
                All examples
              </Link>
              <ThemeToggle />
              {active && (
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Delete conversation"
                  onPress={deleteChat}
                >
                  <Trash size={17} aria-hidden="true" />
                </Button>
              )}
            </div>
          </header>
          <main
            id="main"
            className="flex min-h-[45vh] min-w-0 flex-1 flex-col overflow-y-auto px-4 py-8 sm:px-6 md:min-h-0"
          >
            <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col">
              {active?.messages.length ? (
                <div className="space-y-9 pb-8">
                  <h1 className="sr-only">{active.title}</h1>
                  {active.messages.map((message) => (
                    <article
                      key={message.id}
                      className={
                        message.role === "user"
                          ? "flex justify-end"
                          : "flex items-start gap-3"
                      }
                    >
                      {message.role === "assistant" && (
                        <Avatar
                          name="Assistant"
                          initials="V"
                          className="mt-0.5"
                        />
                      )}
                      <div
                        className={
                          message.role === "user"
                            ? "max-w-[85%] rounded-2xl bg-accent px-4 py-3 text-sm leading-7 sm:max-w-[75%]"
                            : "min-w-0 max-w-2xl flex-1 text-sm leading-7"
                        }
                      >
                        <p className="sr-only">
                          {message.role === "user" ? "You" : "Assistant"}
                        </p>
                        <p className="whitespace-pre-wrap break-words">
                          {message.text}
                        </p>
                        {message.role === "assistant" && (
                          <div className="mt-3">
                            <Button
                              variant="ghost"
                              size="sm"
                              onPress={() => void copyMessage(message)}
                              aria-label={
                                copiedId === message.id
                                  ? "Response copied"
                                  : "Copy response"
                              }
                            >
                              {copiedId === message.id ? (
                                <Check size={15} aria-hidden="true" />
                              ) : (
                                <Copy size={15} aria-hidden="true" />
                              )}
                              {copiedId === message.id ? "Copied" : "Copy"}
                            </Button>
                          </div>
                        )}
                      </div>
                    </article>
                  ))}
                  <div ref={endRef} />
                </div>
              ) : (
                <div className="flex flex-1 flex-col justify-center py-10">
                  <div className="mb-5 flex items-center gap-3">
                    <Avatar name="Assistant" initials="V" />
                  </div>
                  <h1 className="text-3xl font-semibold tracking-[-0.055em] sm:text-4xl">
                    What would you like to work on?
                  </h1>
                  <p className="mt-3 max-w-lg text-sm leading-6 text-muted-foreground">
                    Start with a thought, a question, or something you are
                    working on.
                  </p>
                  <div className="mt-8 grid gap-3 sm:grid-cols-2">
                    {suggestions.map((suggestion) => (
                      <Card key={suggestion.label} className="p-2">
                        <Button
                          variant="ghost"
                          onPress={() => send(suggestion.prompt)}
                        >
                          <Sparkle size={16} aria-hidden="true" />
                          {suggestion.label}
                        </Button>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </main>
          <div className="border-t border-border/70 bg-background px-4 pb-5 pt-4 sm:px-6">
            <form
              className="mx-auto max-w-3xl"
              onSubmit={(event) => {
                event.preventDefault();
                send();
              }}
            >
              <TextArea value={draft} onChange={setDraft}>
                <TextAreaLabel className="sr-only">Message</TextAreaLabel>
                <TextAreaInput
                  ref={composerRef}
                  rows={2}
                  placeholder="Ask a question or start a draft…"
                  onKeyDown={(event) => {
                    if (
                      event.key === "Enter" &&
                      !event.shiftKey &&
                      !event.nativeEvent.isComposing
                    ) {
                      event.preventDefault();
                      send();
                    }
                  }}
                />
              </TextArea>
              <div className="mt-3 flex items-center justify-between gap-3">
                <p className="text-xs leading-5 text-muted-foreground">
                  Prewritten replies · Enter to send · Shift+Enter for a new
                  line
                </p>
                <Button type="submit" size="sm" isDisabled={!draft.trim()}>
                  Send <ArrowUp size={16} aria-hidden="true" />
                </Button>
              </div>
            </form>
            <output className="sr-only">{notice}</output>
          </div>
        </div>
      </div>
    </div>
  );
}
