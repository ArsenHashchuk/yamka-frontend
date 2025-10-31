"use client";

import { useState } from "react";
import styles from "./feedback.module.css";
import { SendHorizonal, ChevronDown } from "lucide-react";

export default function FeedbackForm() {
  const [feedbackType, setFeedbackType] = useState("general");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const [isSelectOpen, setIsSelectOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmissionStatus(null);

    // Add feedback be sent to server/some dashboard/db
    console.log({
      feedbackType,
      subject,
      message,
    });

    try {
      setSubmissionStatus("success");
      setFeedbackType("general");
      setSubject("");
      setMessage("");
    } catch (error) {
      console.error("Feedback submission failed:", error);
      setSubmissionStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.formTitle}>Send Us Feedback</h2>
      <p className={styles.formDescription}>
        We&apos;d love to hear your thoughts, suggestions, or bug reports to
        make Yamka even better!
      </p>

      <form onSubmit={handleSubmit} className={styles.feedbackForm}>
        <div className={styles.formGroup}>
          <label htmlFor="feedbackType" className={styles.label}>
            Feedback Type
          </label>
          <div className={styles.customSelectWrapper}>
            <select
              id="feedbackType"
              name="feedbackType"
              className={styles.select}
              value={feedbackType}
              onChange={(e) => setFeedbackType(e.target.value)}
              onFocus={() => setIsSelectOpen(true)}
              onBlur={() => setIsSelectOpen(false)}
              onClick={() => setIsSelectOpen((prev) => !prev)}
              disabled={isSubmitting}
            >
              <option value="general">General Feedback</option>
              <option value="feature">Feature Request</option>
              <option value="bug">Bug Report</option>
              <option value="data">Map Data Issue</option>
            </select>
            <ChevronDown
              size={20}
              className={`${styles.selectArrow} ${
                isSelectOpen ? styles.selectOpen : ""
              }`}
            />
          </div>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="subject" className={styles.label}>
            Subject
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            className={styles.input}
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="A short summary of your feedback"
            required
            disabled={isSubmitting}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="message" className={styles.label}>
            Your Message
          </label>
          <textarea
            id="message"
            name="message"
            className={styles.textarea}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Tell us more about your experience or suggestion..."
            rows="5"
            required
            disabled={isSubmitting}
          />
        </div>

        {submissionStatus === "success" && (
          <p className={styles.successMessage}>
            Thank you for your feedback! We appreciate it.
          </p>
        )}
        {submissionStatus === "error" && (
          <p className={styles.errorMessage}>
            Failed to send feedback. Please try again later.
          </p>
        )}

        <button
          type="submit"
          className={styles.submitButton}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            "Sending..."
          ) : (
            <>
              Send Feedback <SendHorizonal size={18} />
            </>
          )}
        </button>
      </form>
    </div>
  );
}
