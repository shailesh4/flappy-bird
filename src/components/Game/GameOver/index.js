import React from "react";
import styled from "styled-components";
import OpaqueButton from "../../OpaqueButton";
const Shader = styled.div`
  &&& {
    display: flex !important;
    background: rgba(255, 255, 255, 0.88) !important;
    justify-content: center !important;
    align-items: flex-end !important;
    width: 100% !important;
    height: 100% !important;
  }
`;

const Container = styled.div`
  &&& {
    display: flex !important;
    flex-direction: column !important;
    align-items: center !important;

    font-family: "Montserrat" !important;
    font-style: normal !important;
    color: #000000 !important;
    margin-bottom: 100px !important;
  }
`;

const ButtonsWrap = styled.div`
  &&& {
    display: flex !important;
    justify-content: space-between !important;
    width: 304px !important;

    font-style: normal !important;
    font-weight: 500 !important;
    font-size: 12px !important;
    line-height: 15px !important;
  }
`;

const Header = styled.h3`
  &&& {
    font-weight: 800 !important;
    font-size: 16px !important;
    line-height: 140% !important;

    margin-top: 5px !important;
    margin-bottom: 22px !important;
    padding: 0 !important;
  }
`;

const Count = styled.span`
  &&& {
    font-weight: 800 !important;
    font-size: 64px !important;
    line-height: 100% !important;

    color: ${(props) => `${props.color} !important`};
    text-align: center !important;
    letter-spacing: 0.02em !important;

    margin: 0 !important;
  }
`;

const Description = styled.p`
  &&& {
    font-weight: 600 !important;
    font-size: 10px !important;
    line-height: 160% !important;
    text-align: center !important;

    margin: 0 !important;
    margin-bottom: 56px !important;
  }
`;

const RefreshButton = styled.button`
  &&& {
    border-radius: 5px !important;
    border: none !important;
    &:focus {
      outline: none !important;
    }

    background: ${(props) => `${props.color} !important`};
    color: #ffffff !important;

    padding: 12px 19px !important;
    box-sizing: border-box;
    box-shadow: none !important;

    -webkit-appearance: none !important;
    opacity: 1 !important;

    margin: 0 !important;
  }
`;

const EndButton = styled.button`
  &&& {
    border-radius: 5px !important;
    border: 1px solid #bebebe !important;
    &:focus {
      outline: none !important;
    }
    background: transparent !important;
    color: #000000 !important;

    padding: 12px 40px !important;
    box-sizing: border-box;
    box-shadow: none !important;

    -webkit-appearance: none !important;
    opacity: 1 !important;

    margin: 0 !important;
  }
`;

class GameOver extends React.Component {
  render() {
    const { restart, stopGame, count } = this.props;
    return (
      <Shader>
        <Container>
          {/* <img src={Image} alt="error" /> */}
          <Header>Game over</Header>
          <Count color={this.props.color}>{count}</Count>
          <Description>Ваш счёт</Description>
          <ButtonsWrap>
            <RefreshButton onClick={restart} color={this.props.color}>
              Попробовать ещё
            </RefreshButton>
            <OpaqueButton onClick={stopGame}>Закончить</OpaqueButton>
          </ButtonsWrap>
        </Container>
      </Shader>
    );
  }
}

export default GameOver;
