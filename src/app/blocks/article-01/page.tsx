import { blockMetadata } from "@/lib/block-seo";
import { BlogArticle } from "./blog-article";

export const metadata = blockMetadata("article-01");

export default function ArticleBlockPage() {
  return <BlogArticle />;
}
