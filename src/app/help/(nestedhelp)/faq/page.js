"use client";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";
import styles from "./faq.module.css";

const faqs = [
  {
    id: "1",
    question: "What is Yamka?",
    answer:
      "Yamka is a student-driven map application focused on real-time data and route optimization, designed specifically for urban explorers and daily commuters.",
  },
  {
    id: "2",
    question: "How do I report an incorrect street name or route?",
    answer:
      "You can report map data issues directly by going to the 'Send Feedback' page.",
  },
  {
    id: "3",
    question: "Is Yamka free to use?",
    answer: "Yes, Yamka is completely free.",
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className={styles.faqContainer}>
      <h1 className={styles.faqTitle}>Frequently Asked Questions</h1>

      {faqs.map((item, index) => {
        const isOpen = openIndex === index;

        return (
          <div key={item.id} className={styles.faqItem}>
            <div className={styles.question} onClick={() => toggleFAQ(index)}>
              <span>{item.question}</span>
              <span className={styles.icon}>
                {isOpen ? <Minus size={20} /> : <Plus size={20} />}
              </span>
            </div>

            {isOpen && <p className={styles.answer}>{item.answer}</p>}
          </div>
        );
      })}
    </div>
  );
}
