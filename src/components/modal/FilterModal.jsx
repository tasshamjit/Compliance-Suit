import React, { useState } from 'react';

const FilterModal = ({ onSubmit }) => {
  const [showModal, setShowModal] = useState(true);
  const [formData, setFormData] = useState({
    is_mainland: null,
    is_freezone: null,
    separate_books_for_mainland_and_freezone: null,
  });

  // Handle the Yes/No button clicks
  const handleOptionChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Submit form data to the parent component or API
  const handleSubmit = () => {
    // Ensure proper validation before submitting
    if (formData.is_mainland === null || formData.is_freezone === null) {
      alert('Please answer all questions!');
      return;
    }

    // If both mainland and freezone are true, the user must answer the third question
    if (formData.is_mainland && formData.is_freezone && formData.separate_books_for_mainland_and_freezone === null) {
      alert('Please answer the question about separate books.');
      return;
    }

    onSubmit(formData); // Pass the data to the parent component
    setShowModal(false); // Close modal after submission
  };

  return (
    showModal && (
      <div className="modal">
        <div className="modal-content">
          <h2>Business Information</h2>

          {/* Question 1: Business in mainland */}
          <div>
            <p>Do you have business in mainland?</p>
            <button onClick={() => handleOptionChange('is_mainland', true)}>Yes</button>
            <button onClick={() => handleOptionChange('is_mainland', false)}>No</button>
          </div>

          {/* Question 2: Business in freezone */}
          <div>
            <p>Do you have business in freezone?</p>
            <button onClick={() => handleOptionChange('is_freezone', true)}>Yes</button>
            <button onClick={() => handleOptionChange('is_freezone', false)}>No</button>
          </div>

          {/* Conditional Question 3: Separate books if both mainland and freezone are true */}
          {formData.is_mainland && formData.is_freezone && (
            <div>
              <p>Do you have separate books for mainland and freezone?</p>
              <button onClick={() => handleOptionChange('separate_books_for_mainland_and_freezone', true)}>Yes</button>
              <button onClick={() => handleOptionChange('separate_books_for_mainland_and_freezone', false)}>No</button>
            </div>
          )}

          <button onClick={handleSubmit}>Submit</button>
        </div>
      </div>
    )
  );
};

export default FilterModal;
