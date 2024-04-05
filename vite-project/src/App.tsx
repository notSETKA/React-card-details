import React, { useEffect } from 'react';
import './index.css';

const InteractiveCardDetailsForm: React.FC = () => {
    useEffect(() => {
        const cardFront = document.getElementById('cardfront');
        const cardBack = document.getElementById('cardback');
        const cardNumber = document.querySelector('.cardnumber');
        const cardExpiration = document.querySelector('.expiration');
        const cardHolder = document.querySelector('.cardholder');

        const cvcInput = document.getElementById('cvcinpt');
        const cardNumberInput = document.getElementById('cardNumberInput') as HTMLInputElement;
        const MMInput = document.getElementById('MMinpt') as HTMLInputElement;
        const YYInput = document.getElementById('YYinpt') as HTMLInputElement;
        const cardHolderInput = document.getElementById('cardHolderInput') as HTMLInputElement;
        const detailInputs = document.querySelector('.detailinputs');
        const thanks = document.querySelector('.thanks');

        if (cardFront && cardBack && cardNumber && cardExpiration && cardHolder && cvcInput && cardNumberInput && MMInput && YYInput && cardHolderInput && detailInputs && thanks) {
          cardBack.style.display = 'none';

          cardFront.addEventListener('click', function() {
              cardBack.style.display = 'block';
              hideTooltipFront(); //თულტიპის გაქრობა
              
              if (cardBack.style.display === "block") {
                  cardFront.style.cursor = "default";
              }
          });
      
          cardBack.addEventListener('click', function() {
              cardBack.style.display = 'none';
              
              cardFront.style.cursor = "pointer";
          });
      

            const showTooltipFront = () => {
                if (cardBack.style.display !== "block") {
                    cardFront.setAttribute("data-tooltip", "Click to see the back side and CVC");
                }
            }

            const hideTooltipFront = () => {
                if (cardBack.style.display === "block") {
                    cardFront.removeAttribute("data-tooltip");
                }
            }

            const showTooltipBack = () => {
                cardBack.setAttribute("data-tooltip", "Click to make back side disappear");
            }

            const hideTooltipBack = () => {
                cardBack.removeAttribute("data-tooltip");
            }

            cardFront.addEventListener("mouseenter", showTooltipFront);
            cardFront.addEventListener("mouseleave", hideTooltipFront);
            cardBack.addEventListener("mouseenter", showTooltipBack);
            cardBack.addEventListener("mouseleave", hideTooltipBack);

            const confirmBtn = document.getElementById('cornfirmBtn');
            if (confirmBtn) {
                confirmBtn.addEventListener('click', () => {
                    const cardNumberValue = cardNumberInput.value.replace(/\D/g, '');
                    const mmValue = MMInput.value.replace(/\D/g, '');
                    const yyValue = YYInput.value.replace(/\D/g, '');
                    const cardHolderValue = cardHolderInput.value.trim();
                    const cvcValue = cvcInput.value.replace(/\D/g, '');

                    if (cardNumberValue.length === 16 &&
                        mmValue.length <= 2 && yyValue.length === 2 &&
                        cardHolderValue !== '' && cvcValue.length === 3 && !/\d/.test(cardHolderValue)) {
                        cardNumber.textContent = cardNumberValue.match(/.{1,4}/g)!.join(' ');
                        cardExpiration.textContent = `${mmValue}/${yyValue}`;
                        cardHolder.textContent = cardHolderValue;
                        const cvcElement = document.querySelector('.cvc');
                        if (cvcElement) cvcElement.textContent = cvcValue;

                        cardNumberInput.style.borderColor = '#DFDEE0';
                        MMInput.style.borderColor = '#DFDEE0';
                        YYInput.style.borderColor = '#DFDEE0';
                        cardHolderInput.style.borderColor = '#DFDEE0';
                        cvcInput.style.borderColor = '#DFDEE0';

                        if (detailInputs) detailInputs.style.display = 'none';
                        if (thanks) thanks.style.display = 'flex';
                    } else {
                        if (cardNumberValue.length !== 16) {
                            cardNumberInput.style.borderColor = 'red';
                        } else {
                            cardNumberInput.style.borderColor = '#DFDEE0';
                        }
                        if (mmValue.length > 2 || yyValue.length !== 2) {
                            MMInput.style.borderColor = 'red';
                            YYInput.style.borderColor = 'red';
                        } else {
                            MMInput.style.borderColor = '#DFDEE0';
                            YYInput.style.borderColor = '#DFDEE0';
                        }
                        if (cardHolderValue === '') {
                            cardHolderInput.style.borderColor = 'red';
                        } else {
                            cardHolderInput.style.borderColor = '#DFDEE0';
                        }
                        if (cvcValue.length !== 3 || /\d/.test(cardHolderValue)) {
                            cvcInput.style.borderColor = 'red';
                        } else {
                            cvcInput.style.borderColor = '#DFDEE0';
                        }
                    }
                });
            }

            cardNumberInput.addEventListener('input', (e) => {
                let value = e.target.value;
                value = value.replace(/\D/g, '');
                let formattedValue = '';
                for (let i = 0; i < value.length; i += 4) {
                    formattedValue += value.substr(i, 4) + ' ';
                }
                formattedValue = formattedValue.trim();
                cardNumberInput.value = formattedValue;
            });

            MMInput.addEventListener('input', (e) => {
                let value = e.target.value;
                value = value.replace(/\D/g, '');
                const mmRegex = /^(0?[1-9]|1[0-2])?$/;
                if (mmRegex.test(value)) {
                    if (value.length <= 2) {
                        e.target.value = value;
                    } else {
                        e.target.value = value.slice(0, 2);
                    }
                } else {
                    e.target.value = value.slice(0, -1);
                }
            });

            YYInput.addEventListener('input', (e) => {
                let value = e.target.value;
                value = value.replace(/\D/g, '');
                const yyRegex = /^(0?[0-9]|1[0-9]|2[0-9]|3[0-9])?$/;
                if (yyRegex.test(value)) {
                    if (value.length <= 2) {
                        e.target.value = value;
                    } else {
                        e.target.value = value.slice(0, 2);
                    }
                } else {
                    e.target.value = value.slice(0, -1);
                }
            });
        }
    }, []);

    return (
        <div className="maincontainer">
            <header>
                <div className="cardfront" id="cardfront">
                    <img src="./src/img/Group 8.svg" alt="" className="profile" />
                    <p className="cardnumber">0000 0000 0000 0000</p>
                    <div className="bottomfrontc">
                        <p className="cardholder">JANE APPLESEED</p>
                        <p className="expiration">00/00</p>
                    </div>
                </div>

                <div className="cardback" id="cardback">
                    <div className="blackline"></div>
                    <div className="cvcdiv"><p className="cvc">000</p></div>
                    <img src="./src/img/Group 15.svg" alt="" className="backlines" />
                </div>
            </header>

            <div className="cardDetails">
                <div className="detailinputs">
                    <div className="coolinput">
                        <label htmlFor="cardHolderInput" className="label">CARDHOLDER NAME</label>
                        <input type="text" placeholder="e.g. Jane Appleseed" name="cardholder" className="inputs cardholderinpt" id="cardHolderInput" maxLength={30} />
                    </div>
                    <div className="coolinput">
                        <label htmlFor="cardNumberInput" className="label">CARD NUMBER</label>
                        <input type="text" placeholder="0000 0000 0000 0000" name="cardholder" className="inputs cardnumberinpt" id="cardNumberInput" maxLength={19} />
                    </div>
                    <div className="halfinput">
                        <div className="expir">
                            <label htmlFor="MMinpt" className="label">EXP DATE (MM / YY)</label>
                            <input type="text" placeholder="MM" name="car" className="inputs MM" id="MMinpt" maxLength={2} />
                            <input type="text" placeholder="YY" name="car" className="inputs YY" id="YYinpt" maxLength={2} />
                        </div>
                        <div className="cvcinptdiv">
                            <label htmlFor="cvcinpt" className="label">CVC</label>
                            <input type="text" placeholder="e.g. 123" className="inputs cvcinpt" id="cvcinpt" maxLength={3} />
                        </div>
                    </div>
                </div>
                <div className="thanks" id="thanks" style={{ display: 'none' }}>
                    <img src="./src/img/Group 9.svg" alt="" />
                    <p className="thankyou">THANK YOU!</p>
                    <p className="addedcard">We’ve added your card details</p>
                </div>
                <button className="cornfirmbtn" id="cornfirmBtn">Confirm</button>
            </div>
        </div>
    );
};

export default InteractiveCardDetailsForm;
