import React, { Component } from "react";
import styles from "../CSS/CurrencyConverter.module.css";
import axios from "axios";

class CurrencyConverter extends Component {
  state = {
    Data: null,
    fromCurrency: "USD",
    toCurrency: "GBP",
    currencyNames: [],
    amount: 1,
    convertedAmount: null,
  };

  componentDidMount() {
    axios
      .get("https://api.exchangerate-api.com/v4/latest/USD")
      .then((response) => {
        this.setState({
          currencyNames: Object.keys(response.data.rates),
          Data: response.data,
        });
      });
  }

  selectCurrency = (event) => {
    if (event.target.name === "from") {
      this.setState({ fromCurrency: event.target.value });
    }
    if (event.target.name === "to") {
      this.setState({ toCurrency: event.target.value });
    }
  };

  handleConversion = (event) => {
    event.preventDefault();
    const {
      Data,
      fromCurrency,
      toCurrency,
      convertedAmount,
      amount,
    } = this.state;
    if (fromCurrency !== toCurrency) {
      const result = amount * Data.rates[this.state.toCurrency];
      this.setState({ convertedAmount: result.toFixed(3) });
    }
  };

  render() {
    const {
      currencyNames,
      fromCurrency,
      toCurrency,
      amount,
      convertedAmount,
    } = this.state;

    return (
      <div className={styles.outerContainer}>
        <center>
          <div className={styles.converter}>
            <h1 className={styles.title}>Currency Converter</h1>
            <div className={styles.currencyList}>
              <form className={styles.form} onSubmit={this.handleConversion}>
                <label className={styles.label}>Amount:</label>

                <input
                  type="number"
                  name="amount"
                  value={amount}
                  className={styles.inputBox}
                  onChange={(event) =>
                    this.setState({ amount: event.target.value })
                  }
                />

                <select
                  className={styles.selectFrom}
                  name="from"
                  onChange={(event) => this.selectCurrency(event)}
                  value={fromCurrency}
                >
                  {currencyNames.map((currencyName) => {
                    return (
                      <option
                        key={currencyName}
                        value={currencyName}
                        className={styles.fromCurrencies}
                      >
                        {currencyName}
                      </option>
                    );
                  })}
                </select>
                <label className={styles.label2}>convert to:</label>

                <select
                  className={styles.selectTo}
                  name="to"
                  onChange={(event) => this.selectCurrency(event)}
                  value={toCurrency}
                >
                  {currencyNames.map((currencyName) => {
                    return (
                      <option
                        key={currencyName}
                        value={currencyName}
                        className={styles.toCurrencies}
                      >
                        {currencyName}
                      </option>
                    );
                  })}
                </select>
                <button type="submit" className={styles.convertButton}>
                  Convert
                </button>
                <center>
                  <div>
                    <p className={styles.exchangeRateText}>
                      Exchange Rate ={" "}
                      {this.state.Data
                        ? this.state.Data.rates[this.state.toCurrency]
                        : null}
                    </p>
                  </div>
                  <div className={styles.convertedAmountDisplay}>
                    {convertedAmount}
                  </div>
                </center>
              </form>
            </div>
          </div>
        </center>
        <>
          <center>
            <p>
              Built using this{" "}
              <a href="https://api.exchangerate-api.com/v4/latest/USD">API</a>
            </p>
            <p>
              View the code:{" "}
              <a href="https://github.com/IndigoDreams88/currencyConverter">
                Github
              </a>
            </p>
          </center>
        </>
      </div>
    );
  }
}

export default CurrencyConverter;
