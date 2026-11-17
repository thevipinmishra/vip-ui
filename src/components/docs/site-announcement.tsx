import {
  Announcement,
  AnnouncementTag,
  AnnouncementTitle,
} from "./announcement";

export function SiteAnnouncement() {
  return (
    <Announcement href="/components" until="2026-12-16">
      <AnnouncementTag>New</AnnouncementTag>
      <AnnouncementTitle>
        Carousel, Lightbox, and Event calendar
      </AnnouncementTitle>
    </Announcement>
  );
}
