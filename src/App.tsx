import { useState } from "react";
import "./App.css";
import { Header } from "./components/Header/Header";
import {
  ResultsTable,
  YearlyDataProps,
} from "./components/ResultsTable/ResultsTable";
import { UserInput, userInputProps } from "./components/UserInput/UserInput";

function App() {
  const [results, setResults] = useState<YearlyDataProps[]>([]);
  const [userInitialInvestment, setUserInitialInvestment] = useState(0);

  const calculateHandler = ({ userInput }: userInputProps) => {
    const yearlyData: YearlyDataProps[] = [];

    let currentSavings = userInput["current-savings"];
    setUserInitialInvestment(currentSavings);
    const yearlyContribution = userInput["yearly-contribution"];
    const expectedReturn = userInput["expected-return"] / 100;
    const duration = userInput["duration"];

    for (let i = 0; i < duration; i++) {
      const yearlyInterest = currentSavings * expectedReturn;
      currentSavings += yearlyInterest + yearlyContribution;
      yearlyData.push({
        year: i + 1,
        yearlyInterest,
        savingsEndOfYear: currentSavings,
        yearlyContribution,
      });
    }

    setResults(yearlyData);
  };
  return (
    <div>
      <Header />
      <UserInput onCalculate={calculateHandler} />
      {results.length === 0 && (
        <p style={{ textAlign: "center" }}>No investment is calculated yet.</p>
      )}
      {results.length > 0 && (
        <ResultsTable
          data={results}
          initialInvestment={userInitialInvestment}
        />
      )}
    </div>
  );
}

export default App;
