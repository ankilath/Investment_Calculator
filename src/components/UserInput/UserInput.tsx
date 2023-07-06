import { useState } from "react";
import { styled } from "styled-components";

export const initialUserInput = {
  "current-savings": 10000,
  "yearly-contribution": 1200,
  "expected-return": 7,
  duration: 10,
};

export type userInputProps = {
  userInput: {
    "current-savings": number;
    "yearly-contribution": number;
    "expected-return": number;
    duration: number;
  };
};

const UserInputFormSection = styled.form`
  padding: 1rem;
  max-width: 30rem;
  margin: 2rem auto;
  border-radius: 4px;
  background: linear-gradient(180deg, #307e6c, #2b996d);

  .input-group {
    display: flex;
    justify-content: space-evenly;
    gap: 1.5rem;
  }

  & label {
    display: block;
    margin-bottom: 0.25rem;
    font-family: "Roboto Condensed", sans-serif;
    font-size: 0.5rem;
    font-weight: bold;
    text-transform: uppercase;
  }

  & input {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #76c0ae;
    border-radius: 0.25rem;
    background-color: transparent;
    color: #c2e9e0;
    font-size: 1rem;
  }

  .actions {
    display: flex;
    justify-content: center;
    gap: 1rem;
  }

  .button {
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 0.25rem;
    background: linear-gradient(180deg, #1f584b, #17493d);
    color: #c2e9e0;
    font-family: "Roboto Condensed", sans-serif;
    cursor: pointer;
  }

  .buttonAlt {
    font-family: "Roboto Condensed", sans-serif;
    border: none;
    background: transparent;
    color: #c2e9e0;
    cursor: pointer;
  }

  button:hover {
    background: linear-gradient(180deg, #1b5346, #113c32);
  }

  .buttonAlt:hover {
    background: transparent;
    color: #91e1d0;
  }
`;

type UserInputProps = {
  onCalculate: (userInput: userInputProps) => void;
};

export const UserInput = ({ onCalculate }: UserInputProps) => {
  const [userInput, setUserInput] = useState(initialUserInput);

  const submitHandler = (event: any) => {
    event.preventDefault();
    onCalculate({ userInput });
  };

  const resetHandler = () => {
    setUserInput(initialUserInput);
  };

  const inputChangeHandler = (input: string, value: string) => {
    setUserInput((prevInput) => {
      return {
        ...prevInput,
        [input]: +value,
      };
    });
  };

  return (
    <UserInputFormSection onSubmit={submitHandler}>
      <div className="input-group">
        <p>
          <label htmlFor="current-savings">Current Savings ($)</label>
          <input
            type="number"
            value={userInput["current-savings"]}
            id="current-savings"
            onChange={(event) =>
              inputChangeHandler("current-savings", event.target.value)
            }
          />
        </p>
        <p>
          <label htmlFor="yearly-contribution">Yearly Savings ($)</label>
          <input
            type="number"
            id="yearly-contribution"
            value={userInput["yearly-contribution"]}
            onChange={(event) =>
              inputChangeHandler("yearly-contribution", event.target.value)
            }
          />
        </p>
      </div>
      <div className="input-group">
        <p>
          <label htmlFor="expected-return">
            Expected Interest (%, per year)
          </label>
          <input
            type="number"
            value={userInput["expected-return"]}
            id="expected-return"
            onChange={(event) =>
              inputChangeHandler("expected-return", event.target.value)
            }
          />
        </p>
        <p>
          <label htmlFor="duration">Investment Duration (years)</label>
          <input
            type="number"
            id="duration"
            value={userInput["duration"]}
            onChange={(event) =>
              inputChangeHandler("duration", event.target.value)
            }
          />
        </p>
      </div>
      <p className="actions">
        <button type="reset" className="buttonAlt" onClick={resetHandler}>
          Reset
        </button>
        <button type="submit" className="button">
          Calculate
        </button>
      </p>
    </UserInputFormSection>
  );
};
