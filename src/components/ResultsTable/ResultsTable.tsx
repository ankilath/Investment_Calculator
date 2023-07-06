import { styled } from "styled-components";
import { formatter } from "./utils";

export type YearlyDataProps = {
  year: number;
  yearlyInterest: number;
  savingsEndOfYear: number;
  yearlyContribution: number;
};

type ResultsTableDataProps = {
  data: YearlyDataProps[];
  initialInvestment: number;
};

const ResultsTableSection = styled.table`
  max-width: 50rem;
  margin: 2rem auto;
  padding: 1rem;
  table-layout: fixed;
  border-spacing: 1rem;
  text-align: right;

  & thead {
    font-size: 0.7rem;
    color: #83e6c0;
  }

  & tbody {
    font-family: "Roboto Condensed", sans-serif;
    font-size: 0.85rem;
    color: #c2e9e0;
  }
`;

export const ResultsTable = ({
  data,
  initialInvestment,
}: ResultsTableDataProps) => {
  return (
    <ResultsTableSection>
      <thead>
        <tr>
          <th>Year</th>
          <th>Total Savings</th>
          <th>Interest (Year)</th>
          <th>Total Interest</th>
          <th>Invested Capital</th>
        </tr>
      </thead>
      <tbody>
        {data.map((yearData) => (
          <tr key={yearData.year}>
            <td>{yearData.year}</td>
            <td>{formatter.format(yearData.savingsEndOfYear)}</td>
            <td>{formatter.format(yearData.yearlyInterest)}</td>
            <td>
              {formatter.format(
                yearData.savingsEndOfYear -
                  initialInvestment -
                  yearData.yearlyContribution * yearData.year
              )}
            </td>
            <td>
              {formatter.format(
                initialInvestment + yearData.yearlyContribution * yearData.year
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </ResultsTableSection>
  );
};
