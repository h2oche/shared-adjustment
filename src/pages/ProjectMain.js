import React, { Component } from 'react';
import Slider from "react-slick";
import {Typography, Container, Grid, CssBaseline, Button} from "@material-ui/core";
import {withStyles} from "@material-ui/core/styles"
import ProjectMainStyle from "../styles/ProjectMain";
import {readMain} from "../store/reducers/meta";
import {connect} from "react-redux";

import "../styles/ProjectMain.css";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

export class ProjectMain extends Component {
  onNextPageBtnClick = () => {
    this.props.readMain();
  }

  render() {
    const {classes} = this.props;
    const sliderSettings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      draggable: false,
      // dotsClass: classes.sliderDot 
    }

    return (
      <Container fixed>
        <CssBaseline/>
        <Grid container className={classes.projectMainContainer}>
          <Grid item xs={12}>
            <Typography component="h4">
              이제부터 같은 팀에 배정된 4명의 팀원과 협력하여 문제를 해결하는 과제가 진행됩니다.
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography component="h4">
              아래에 제시된 문제와 관련 자료를 충분히 읽고, 다음 페이지로 이동해 주시기 바랍니다. 
            </Typography>
          </Grid>
          <Grid item xs={12} className={classes.sliderContainer}>
            <Slider {...sliderSettings} className={classes.instrSlider}>
              <div className={classes.instrContainer}>
                <p>
                  현재 우리 사회에서는 다음과 같은 문제가 점점 커지면서, 어떻게 해결해야 할 것인가에 대한 논의가 활발히 이루어지고 있습니다.
                </p>
              </div>
              <div className={classes.instrContainer}>
                <p>
                  교육을 통해 사회문제를 해결하기 위해 설립된 A단체에서는 이러한 문제를 해결하기 위해 적합한 교육 프로그램을 
                  설계하는 프로젝트를 진행하게 되었습니다. 
                </p>
                <p> 
                  귀하는 프로젝트를 담당하는 팀의 일원으로써 이제부터 교육 프로그램의 첫 번째 차시(90분) 수업지도안을 설계해야합니다.
                </p>
                <p>
                  앞으로 1시간 30분 동안 4명의 팀원들과 함께 온라인 채팅으로 토론하면서, 주어진 양식에 맞추어 수업지도안을 
                  설계해 주시기 바랍니다. 단, 수업지도안 설계시에는 다음과 같은 조건을 고려해야 합니다. 
                </p>
                <p>
                  1) 두 가지 이상의 교육방법을 적용할 것
                  2) 교육방법과 관련된 활동이 충분히 드러나도록 구체적으로 서술할 것
                  3) 대상 학습자는 자유롭게 결정할 것
                </p>
                <p>
                  오른쪽에서는 앞으로 작성할 수업지도안 양식과 설계시 참고할 수 있는 자료가 제시됩니다. 
                </p>
                <p>
                  교육을 통해 사회문제를 해결하기 위해 설립된 A단체에서는 이러한 문제를 해결하기 위해 적합한 교육 프로그램을 
                  설계하는 프로젝트를 진행하게 되었습니다. 
                </p>
                <p> 
                  귀하는 프로젝트를 담당하는 팀의 일원으로써 이제부터 교육 프로그램의 첫 번째 차시(90분) 수업지도안을 설계해야합니다.
                </p>
                <p>
                  앞으로 1시간 30분 동안 4명의 팀원들과 함께 온라인 채팅으로 토론하면서, 주어진 양식에 맞추어 수업지도안을 
                  설계해 주시기 바랍니다. 단, 수업지도안 설계시에는 다음과 같은 조건을 고려해야 합니다. 
                </p>
                <p>
                  1) 두 가지 이상의 교육방법을 적용할 것
                  2) 교육방법과 관련된 활동이 충분히 드러나도록 구체적으로 서술할 것
                  3) 대상 학습자는 자유롭게 결정할 것
                </p>
                <p>
                  오른쪽에서는 앞으로 작성할 수업지도안 양식과 설계시 참고할 수 있는 자료가 제시됩니다. 
                </p>
                <p>
                  교육을 통해 사회문제를 해결하기 위해 설립된 A단체에서는 이러한 문제를 해결하기 위해 적합한 교육 프로그램을 
                  설계하는 프로젝트를 진행하게 되었습니다. 
                </p>
                <p> 
                  귀하는 프로젝트를 담당하는 팀의 일원으로써 이제부터 교육 프로그램의 첫 번째 차시(90분) 수업지도안을 설계해야합니다.
                </p>
                <p>
                  앞으로 1시간 30분 동안 4명의 팀원들과 함께 온라인 채팅으로 토론하면서, 주어진 양식에 맞추어 수업지도안을 
                  설계해 주시기 바랍니다. 단, 수업지도안 설계시에는 다음과 같은 조건을 고려해야 합니다. 
                </p>
                <p>
                  1) 두 가지 이상의 교육방법을 적용할 것
                  2) 교육방법과 관련된 활동이 충분히 드러나도록 구체적으로 서술할 것
                  3) 대상 학습자는 자유롭게 결정할 것
                </p>
                <p>
                  오른쪽에서는 앞으로 작성할 수업지도안 양식과 설계시 참고할 수 있는 자료가 제시됩니다. 
                </p>
                <p>
                  교육을 통해 사회문제를 해결하기 위해 설립된 A단체에서는 이러한 문제를 해결하기 위해 적합한 교육 프로그램을 
                  설계하는 프로젝트를 진행하게 되었습니다. 
                </p>
                <p> 
                  귀하는 프로젝트를 담당하는 팀의 일원으로써 이제부터 교육 프로그램의 첫 번째 차시(90분) 수업지도안을 설계해야합니다.
                </p>
                <p>
                  앞으로 1시간 30분 동안 4명의 팀원들과 함께 온라인 채팅으로 토론하면서, 주어진 양식에 맞추어 수업지도안을 
                  설계해 주시기 바랍니다. 단, 수업지도안 설계시에는 다음과 같은 조건을 고려해야 합니다. 
                </p>
                <p>
                  1) 두 가지 이상의 교육방법을 적용할 것
                  2) 교육방법과 관련된 활동이 충분히 드러나도록 구체적으로 서술할 것
                  3) 대상 학습자는 자유롭게 결정할 것
                </p>
                <p>
                  오른쪽에서는 앞으로 작성할 수업지도안 양식과 설계시 참고할 수 있는 자료가 제시됩니다. 
                </p>
              </div>
              <div className={classes.instrContainer}>
                <p>1) 수업지도안 양식</p>
                <p>2) 참고자료: 현장에서 활용되는 대표적인 교수방법</p>
              </div>
            </Slider>
          </Grid>

          <Grid item xs={12} className={classes.toolbarContainer}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              onClick={this.onNextPageBtnClick}>
              다음페이지
            </Button>
          </Grid>
        </Grid>
      </Container>
    )
  }
}

const mapStateToProps = () => ({});
const mapDispatchToProps = (dispatch) => ({
  readMain: () => dispatch(readMain())
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(ProjectMainStyle)(ProjectMain));
