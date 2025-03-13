export const UncontrolledForm = () => {
  return (
    <form noValidate>
      <div className="form-group">
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" required />
        <div className="error-message" id="name-error">
          Please enter your name
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="age">Age:</label>
        <input type="number" id="age" name="age" min="1" max="120" required />
        <div className="error-message" id="age-error">
          Please enter a valid age (1-120)
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" required />
        <div className="error-message" id="email-error">
          Please enter a valid email address
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" required />
        <div className="error-message" id="password-error">
          Password must be at least 8 characters
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="confirm-password">Confirm Password:</label>
        <input
          type="password"
          id="confirm-password"
          name="confirm-password"
          required
        />
        <div className="error-message" id="confirm-password-error">
          Passwords do not match
        </div>
      </div>

      <div className="form-group">
        <label>Gender:</label>
        <div className="radio-group">
          <input type="radio" id="male" name="gender" value="male" />
          <label htmlFor="male">Male</label>

          <input type="radio" id="female" name="gender" value="female" />
          <label htmlFor="female">Female</label>

          <input type="radio" id="other" name="gender" value="other" />
          <label htmlFor="other">Other</label>
        </div>
        <div className="error-message" id="gender-error">
          Please select a gender
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="country">Country:</label>
        <input
          type="text"
          id="country"
          name="country"
          list="countries"
          required
        />
        <datalist id="countries">
          <option value="United States" />
          <option value="Canada" />
          <option value="United Kingdom" />
          <option value="Australia" />
          <option value="Germany" />
          <option value="France" />
          <option value="Japan" />
          <option value="Brazil" />
          <option value="India" />
          <option value="Russia" />
        </datalist>
        <div className="error-message" id="country-error">
          Please select a country
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="profile-picture">Profile Picture:</label>
        <input
          type="file"
          id="profile-picture"
          name="profile-picture"
          accept="image/*"
        />
        <div className="error-message" id="profile-picture-error">
          Please upload a valid image file
        </div>
      </div>

      <div className="form-group checkbox-group">
        <input type="checkbox" id="terms" name="terms" required />
        <label htmlFor="terms">I accept the Terms and Conditions</label>
        <div className="error-message" id="terms-error">
          You must accept the terms and conditions
        </div>
      </div>

      <div className="form-actions">
        <button type="submit" className="submit-btn">
          Submit
        </button>
        <button type="reset" className="reset-btn">
          Reset
        </button>
      </div>
    </form>
  );
};
