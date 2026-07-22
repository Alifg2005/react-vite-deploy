import { createContext, useContext, useState, type ReactNode } from "react";
import { ADMIN_NEWS_EVENTS, type AdminNewsEvent } from "../mock";

export interface NewsEventFormValues {
  title: string;
  type: "news" | "event";
  date: string;
  excerpt: string;
  image: string | null;
}

interface NewsEventsContextValue {
  items: AdminNewsEvent[];
  addItem: (values: NewsEventFormValues) => void;
  updateItem: (id: string, values: NewsEventFormValues) => void;
  removeItem: (id: string) => void;
}

const NewsEventsContext = createContext<NewsEventsContextValue | null>(null);

// Lives above the /admin/news-events list and the dedicated
// /admin/news-events/new and /admin/news-events/:id/edit pages so an item
// added or edited on its own page is reflected back on the list once the
// admin navigates back — a page-local useState would reset on remount.
export function NewsEventsProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<AdminNewsEvent[]>(ADMIN_NEWS_EVENTS);

  function addItem(values: NewsEventFormValues) {
    setItems((current) => [
      {
        id: `ne-${Date.now()}`,
        title: values.title.trim(),
        type: values.type,
        date: values.date,
        status: "published",
        excerpt: values.excerpt.trim(),
        image: values.image,
      },
      ...current,
    ]);
  }

  function updateItem(id: string, values: NewsEventFormValues) {
    setItems((current) =>
      current.map((item) =>
        item.id === id
          ? { ...item, title: values.title.trim(), type: values.type, date: values.date, excerpt: values.excerpt.trim(), image: values.image }
          : item
      )
    );
  }

  function removeItem(id: string) {
    setItems((current) => current.filter((item) => item.id !== id));
  }

  return (
    <NewsEventsContext.Provider value={{ items, addItem, updateItem, removeItem }}>
      {children}
    </NewsEventsContext.Provider>
  );
}

export function useNewsEvents(): NewsEventsContextValue {
  const context = useContext(NewsEventsContext);

  if (!context) {
    throw new Error("useNewsEvents must be used within a NewsEventsProvider");
  }

  return context;
}
