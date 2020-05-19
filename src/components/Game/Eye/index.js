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

const Wrapper = styled.div`
  &&& {
    touch-action: manipulation !important;
    position: relative !important;
    overflow: hidden !important;
    height: ${(props) =>
      props.height ? `${props.height}px` : "100%"} !important;
    width: ${(props) => (props.width ? `${props.width}px` : "100%")} !important;
    background: grey;
  }
`;
const HeaderRow = styled.div`
  &&& {
    position: absolute !important;
    top: 0 !important;
    left: 0 !important;
    width: calc(100% - 20px) !important;
    padding: 10px !important;
    z-index: 20000 !important;
    display: flex !important;
    align-items: center !important;
  }
`;

const ExtraPos = styled.div`
  &&& {
    margin: 0px 20px !important;
    margin-bottom: 12px !important;
  }
`;

const ScoreWrap = styled.div`
  &&& {
    left: 25px !important;
    bottom: 25px !important;
    position: absolute !important;
    z-index: "10009 !important";
    font-weight: 700 !important;
    font-size: 40px !important;
    font-family: "Montserrat" !important;
  }
`;

const CloseButton = styled.span`
  &&& {
    position: relative !important;
    margin-bottom: 12px !important;
    height: 30px !important;
    width: 30px !important;
    background: rgba(171, 171, 171, 0.16) !important;
    border-radius: 50% !important;
    display: flex !important;
    justify-content: center !important;
    align-items: center !important;

    margin-right: 15px !important;

    &:hover {
      background: rgba(171, 171, 171, 0.26) !important;
    }
    &:before,
    &:after {
      position: absolute !important;

      content: " " !important;
      height: 12px !important;
      width: 2px !important;
      border-radius: 1px !important;
      background-color: #4e4e4e !important;
    }
    &:before {
      transform: rotate(45deg) !important;
    }
    &:after {
      transform: rotate(-45deg) !important;
    }
  }
`;
/* for close button
${media.desktop`
    
      
      
  `};
  for initialtext
  ${media.desktop`
    display: none !important;
    `};*/

const InitialText = styled.div`
  &&& {
    position: absolute !important;
    top: 400px !important;
    left: 100px !important;
    width: 230px !important;
    font-family: "Montserrat" !important;
    font-style: normal !important;
    font-weight: normal !important;
    font-size: 14px !important;
    line-height: 24px !important;
    /* or 171% */

    letter-spacing: 0.02em !important;
    color: #888888 !important;
  }
`;

const CloseWrapper = styled.div`
  &&& {
    display: flex !important;
    align-items: center !important;
    justify-content: flex-end !important;
    margin-left: auto !important;
  }
`;

const GameOverWrapper = styled.div`
  &&& {
    position: absolute !important;
    top: 0px !important;
    left: 0px !important;
    height: 100% !important;
    width: 100% !important;
    z-index: 19000 !important;
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
const MovingWrap = styled.div.attrs((props) => ({
  style: {
    left: `${props.horizontal}px`,
    top: `${props.vertical}px`,
  },
}))`
  &&& {
    position: absolute !important;
  }
`;
//left: ${(props) => `${props.horizontal}px !important;`};
//top: ${(props) => `${props.vertical}px !important;`};
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
      currentHeight: props.height * 0.4, // change the constant to props.height
      initialLogoX: props.width * 0.3,
      started: false,
      score: 0,
      pipes: getInitialPipes(props.height, props.width),
      velocity: 10,
      gravity: 1.1,
      pipeSpeed: this.props.width / 100, //smaller width slower pipespeed
      gameStarted: false,
      gameOver: false,
      isHit: false,
    };

    this.handleSpace = this.handleSpace.bind(this);
    this.handleTouch = this.handleTouch.bind(this);
    this.moveUp = this.moveUp.bind(this);
    this.update = this.update.bind(this);
  }

  moveUp() {
    this.setState({
      velocity: this.state.velocity - 25,
    });
  }

  update() {
    if (
      this.state.currentHeight <= 0 ||
      this.state.currentHeight >= this.props.height - 40 ||
      this.state.isHit
    ) {
      clearInterval(this.interval);
      this.setState({
        velocity: 0,
        gravity: 0,
        gameOver: true,
      });
      return;
    }
    let birdX = this.state.initialLogoX;

    if (
      (this.state.pipes[0].x > birdX - 50 &&
        this.state.pipes[0].x < birdX + 50) ||
      (this.state.pipes[1].x > birdX - 50 && this.state.pipes[1].x < birdX + 50) //don't put hard-values, use it in conjunction with initialx
    ) {
      let closerPipe;
      if (
        this.state.pipes[0].x > birdX - 50 &&
        this.state.pipes[0].x < birdX + 50
      ) {
        //same as above
        closerPipe = this.state.pipes[0];
      } else {
        closerPipe = this.state.pipes[1];
      }

      const xDifference = closerPipe.x - birdX;
      const hitOnX = xDifference < 35 && xDifference > -25; //there might be a small problem
      const hitOnUpperY =
        this.state.currentHeight + 5 < closerPipe.upperPipeHeight; //adding 5 for corners
      console.log("current height ", this.state.currentHeight);
      const hitOnLowerY =
        this.state.currentHeight + 10 >
        this.props.height - closerPipe.bottomPipeHeight; //10 is for corners, put height

      if (hitOnX) {
        if (hitOnUpperY || hitOnLowerY) {
          this.setState({
            isHit: true,
          });
        }
        if (this.state.score > 4 && this.state.score % 5 === 0) {
          //score manipulation
          this.setState({
            score: this.state.score + 1,
            pipeSpeed: this.state.pipeSpeed + 1,
          });
        } else {
          this.setState({
            score: this.state.score + 1,
          });
        }
      }
    }

    const newVelocity = (this.state.velocity + this.state.gravity) * 0.9;
    const newCurrentHeight = newVelocity + this.state.currentHeight;
    const newPipes = this.state.pipes.map((pipe) => {
      const newX = pipe.x - this.state.pipeSpeed;
      if (newX < -28) {
        return {
          upperPipeHeight: this.props.height / 2 - 15 - Math.random() * 150,
          bottomPipeHeight: this.props.height / 2 - 15 - Math.random() * 150, //add media offset
          x: this.props.width - 40, //add width
        };
      }
      return {
        ...pipe,
        x: newX,
      };
    });
    this.setState({
      currentHeight: newCurrentHeight,
      velocity: newVelocity,
      pipes: newPipes,
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
    const { height, width } = this.props;
    return (
      <Wrapper width={this.props.width} height={this.props.height}>
        {this.state.gameOver && (
          <GameOverWrapper>
            <h1> Game OVER</h1>
          </GameOverWrapper>
        )}
        <HeaderRow>
          <CloseWrapper>
            <CloseButton onClick={this.props.stopGame} />
          </CloseWrapper>
        </HeaderRow>
        {!this.state.gameStarted && (
          <InitialText>
            Нажмите пробел чтобы взлететь и набирать высоту
          </InitialText>
        )}
        {!this.state.gameOver && (
          <ScoreWrap height={height + "px"} width={width + "px"}>
            {this.state.score}
          </ScoreWrap>
        )}
        <MovingWrap
          horizontal={this.state.initialLogoX}
          vertical={this.state.currentHeight}
        >
          <Logo>
            <White />
          </Logo>
        </MovingWrap>
        {this.state.pipes.map((pipe) => {
          const upperPipeHeight = pipe.upperPipeHeight;
          const x = pipe.x;

          const bottomPipeTop = this.props.height - pipe.bottomPipeHeight; //make it height
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
    );
  }
}

export default FlappyEye;

FlappyEye.defaultProps = {
  height: 800,
  width: 400,
};
