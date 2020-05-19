import React from "react";
import styled from "styled-components";
import Pipe from "../Pipe";

//const mediaOffset = mediaType.desktop ? 150 : 170;
const Logo = styled.div`
  &&& {
    position: relative !important;
    width: 24px !important;
    border: ${(props) => `8px solid #ff2d55 !important`};
    height: 24px !important;
    border-radius: 50% !important;
    background: black !important;
  }
`;
// change the color #ff2d55 to props.color later

const Screen = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.div`
  &&& {
    touch-action: manipulation !important;
    position: relative !important;
    overflow: hidden !important;
    height: ${(props) => (props.height ? props.height : "100%")} !important;
    width: ${(props) => (props.width ? props.width : "100%")} !important;
    background: grey;
  }
`;

const White = styled.div`
  &&& {
    position: absolute !important;
    border-radius: 50% !important;
    background: white !important;
    width: 10px !important;
    height: 10px !important;
    top: 0px !important;
    left: 0px !important;
  }
`;
const MovingWrap = styled.div`
  &&& {
    left: ${(props) => `${props.horizontal}px !important;`};
    top: ${(props) => `${props.vertical}px !important;`};
    position: absolute !important;
  }
`;

const getInitialPipes = (h, w) => {
  const count = 3;
  const pipes = [];
  for (let i = 1; i < count; i++) {
    const x = w + 200 + w / i;
    pipes.push({
      upperPipeHeight: h / 2 - 15 - Math.random() * 150,
      bottomPipeHeight: h / 2 - 15 - Math.random() * 150, //put the media offset
      x: x,
    });
  }
  return pipes;
};

export class FlappyEye extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentHeight: 800 / 2 + 120, // change the constant to props.height
      initialLogoX: 800 / 2 - 250,
      started: false,
      pipes: getInitialPipes(800, 100),
      velocity: 10,
      gravity: 1.1,
      gameStarted: false,
      gameOver: true,
    };

    this.handleSpace = this.handleSpace.bind(this);
    this.handleTouch = this.handleTouch.bind(this);
    this.moveUp = this.moveUp.bind(this);
    this.update = this.update.bind(this);
    //this.setVelocity = this.setVelocity.bind(this);
  }

  moveUp() {
    this.setState({
      velocity: this.state.velocity - 25,
    });
  }

  update() {
    if (this.state.currentHeight <= 0 || this.state.currentHeight >= 760) {
      //change the height appropraitely from props
      clearInterval(this.interval);
      this.setState({
        velocity: 0,
        gravity: 0,
        gameOver: true,
      });
      return;
    }
    const newVelocity = (this.state.velocity + this.state.gravity) * 0.9;
    const newCurrentHeight = newVelocity + this.state.currentHeight;
    this.setState({
      currentHeight: newCurrentHeight,
      velocity: newVelocity,
    });
  }

  handleTouch(e) {
    if (!this.state.gameStarted) {
      this.interval = setInterval(() => this.update(), 15);
      this.setState({ gameStarted: true });
    }
    e.preventDefault();
    this.moveUp();
  }

  handleSpace(e) {
    //currently handleSpace actually listens for any key down and start the update function, can be remedied by having a game start button.
    if (!this.state.gameStarted) {
      this.interval = setInterval(() => this.update(), 15);
      this.setState({ gameStarted: true });
    }
    e.preventDefault();
    if (e.keyCode === 32) {
      this.moveUp();
    }
  }

  componentDidMount() {
    window.addEventListener("touchstart", this.handleTouch);
    window.addEventListener("keydown", this.handleSpace);
  }

  componentWillUnmount() {
    window.removeEventListener("touchstart", this.handleTouch);
    window.removeEventListener("keydown", this.handleSpace);
  }

  render() {
    return (
      <Screen>
        <Wrapper width={this.props.width} height={this.props.height}>
          <MovingWrap
            horizontal={this.state.initialLogoX}
            vertical={this.state.currentHeight}
          >
            <Logo>
              <White />
            </Logo>
          </MovingWrap>
          {console.log(this.state.pipes)}
          {this.state.pipes.map((pipe) => {
            const upperPipeHeight = pipe.upperPipeHeight;
            const x = pipe.x;

            const bottomPipeTop = 800 - pipe.bottomPipeHeight; //make it height
            const bottomPipeHeight = pipe.bottomPipeHeight;

            return (
              <Pipe
                key={x}
                isHit={pipe.isHit}
                upperPipeHeight={upperPipeHeight}
                bottomPipeHeight={bottomPipeHeight}
                x={x}
                bottomPipeTop={bottomPipeTop}
                color={this.props.color}
              />
            );
          })}
        </Wrapper>
      </Screen>
    );
  }
}

export default FlappyEye;

FlappyEye.defaultProps = {
  height: "800px",
  width: "800px",
};
