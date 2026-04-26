import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

const publications = [
  {
    title: "Healthcare Document RAG Assistant",
    description:
      "A Retrieval-Augmented Generation (RAG) system built to answer medical queries from healthcare documents. The system uses FAISS for vector search, LangChain for orchestration, and a fine-tuned LLM to provide accurate, source-grounded responses — reducing hallucination and improving clinical decision support.",
    tags: ["RAG", "LangChain", "FAISS", "LLM", "Healthcare AI"],
    date: "2025",
    link: "https://app.readytensor.ai/publications/healthcare-document-rag-assitant-0EKLQ6QTqtCS",
  },
];

export default function PublicationsPage() {
  return (
    <main className="min-h-screen bg-background text-foreground px-6 py-24 max-w-4xl mx-auto">
      <h1 className="text-5xl font-bold mb-4">Publications</h1>
      <p className="text-muted-foreground mb-16 text-lg">
        Research and technical writing on AI, data systems, and machine learning.
      </p>

      <div className="flex flex-col gap-10">
        {publications.map((pub, i) => (
          <div
            key={i}
            className="border border-border rounded-xl p-8 bg-white/5 hover:bg-white/10 transition-all"
          >
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <h2 className="text-2xl font-semibold">{pub.title}</h2>
              <span className="text-sm text-muted-foreground">{pub.date}</span>
            </div>

            <p className="mt-4 text-muted-foreground leading-relaxed">
              {pub.description}
            </p>

            <div className="flex flex-wrap gap-2 mt-6">
              {pub.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-3 py-1 rounded-full border border-border bg-white/5 text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>

            <Link href={pub.link} target="_blank" className="mt-8 inline-block">
              <Button className="gap-2">
                Read Publication <ExternalLink size={14} />
              </Button>
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}