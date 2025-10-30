import styles from "./faq.module.css";

const faqs = [
  {
    question: "What is Yamka?",
    answer:
      "Yamka is a cutting-edge, community-driven map application focused on real-time data and route optimization, designed specifically for urban explorers and daily commuters.",
  },
  {
    question: "How do I report an incorrect street name or route?",
    answer:
      "You can report map data issues directly by going to the 'Send Feedback' page, selecting 'Map Data Issue', and pinning the location on the mini-map provided in the form.",
  },
  {
    question: "Is Yamka free to use?",
    answer:
      "Yes, the core mapping and navigation features of Yamka are completely free. We offer premium subscription tiers for advanced features like offline maps and ad-free usage.",
  },
];

export default function FAQPage() {
  return (
    <div className={styles.faqContainer}>
      <h1 className={styles.faqTitle}>Frequently Asked Questions</h1>

      {faqs.map((item, index) => (
        <div key={index} className={styles.faqItem}>
          <div className={styles.question}>
            {item.question}
            <span>+</span> {/* Placeholder for an expand/collapse icon */}
          </div>
          <p className={styles.answer}>{item.answer}</p>
        </div>
      ))}
    </div>
  );
}
