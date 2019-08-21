import React, { Component } from 'react';
import {Grid, ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary, Typography} from "@material-ui/core";
import {ExpandMore} from "@material-ui/icons";
import {withStyles} from "@material-ui/core/styles"
import ProjectMainStyle from "../styles/ProjectMain";

export class ProjectDetails extends Component {
  state = {
    expanded: false,
    subExpanded: false
  }

  handleChange = _panel => (_e, _isExpanded) => {
    this.setState({expanded: _isExpanded ? _panel : false});
  }

  handleSubChange = _panel => (_e, _isExpanded) => {
    this.setState({subExpanded: _isExpanded ? _panel : false});
  }
  
  render() {
    const {classes} = this.props;
    const {expanded, subExpanded} = this.state;

    return (
      <Grid item xs={12}>
        <ExpansionPanel expanded={expanded === 'panel1'} onChange={this.handleChange('panel1')}>
          <ExpansionPanelSummary
            expandIcon={<ExpandMore style={{color: "white"}} />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
            className={classes.headingBackground}
          >
            <Typography className={classes.heading}>중학교 교사 A씨의 이야기</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <div>
              <Typography className={classes.paragraph}>
                과학, 예술, 경제, 법 등 전문분야 뿐 아니라 일상생활까지 다양한 분야의 지식을 동영상 콘텐츠로 공유하는 시대가 되었습니다. 이러한 시대를 일컬어 ‘지식튜브(지식+유튜브)’의 시대라고도 이야기합니다. 지식튜브는 예외 없이 학교에도 영향을 미치고 있습니다. 30년 전에는 궁금한 것이 생기면 선생님에게 묻거나 책을 뒤졌고, 10여년 전부터는 온라인 검색 포털에 질문을 하는 현상이 일어났지만, 이제는 유튜브가 그 역할을 하고 있습니다 (동아일보 기사, 2019. 7. 23).
              </Typography>
              <Typography className={classes.paragraph}>
                이러한 상황 가운데 중학교 교사 A씨는 최근 수업을 준비하고 진행하는 데 어려움을 겪고 있습니다. 온라인 플랫폼의 동영상 콘텐츠 때문입니다, 아이들이 직접 재미있고도 유익한 지식 콘텐츠를 찾아보고 공부하는 모습을 보면 참 대견합니다. 하지만 실제로 학생들이 즐겨 찾는 동영상 콘텐츠의 내용을 살펴보면 사실이 아니거나 잘못된 정보로 만들어진 경우도 많습니다. 심지어 아이들은 숙제를 할 때에도 사실인 것처럼 꾸며진 거짓 기사를 자료로 사용하기도 합니다. 실제로 스탠퍼드대 연구팀(2016)은 10대 청소년 대부분이 소셜 네트워크 서비스(SNS)에 유통되는 거짓 정보와 가짜뉴스를 그대로 믿으며, 작성자가 누구든 간에 사진의 크기가 크고 설명이 길고 자세할수록 진실로 받아들인다는 결과를 보고했습니다. 더욱 심각한 문제는 학생들이 크리에이터(콘텐츠 제작자)를 지나치게 신뢰하다 보니 수업을 진행하기도 힘들다는 것입니다. 조선일보 기사(2019. 4. 22)에서도 학생들이 유튜버가 사실이라고 하면 대부분 내용을 의심하지 않고 믿는다는 문제를 기사화한 바가 있습니다. 또한 학생들은 잘못된 정보를 친구들과 메신저로 쉽게 공유할 뿐 아니라, 잘못된 콘텐츠를 만드는 크리에이터가 되기도 합니다. 이러한 문제들은 비단 A씨만의 문제는 아니며, 많은 교사들이 A씨와 같은 어려움을 호소하고 있습니다.
              </Typography>
              <Typography className={classes.paragraph}>
                여러분은 교사 A씨가 재직 중인 지역 교사연구회의 회원들입니다. A씨의 문제를 해결하는 데 도움이 되도록 학습활동을 설계하여 추후 다른 학교에도 배포하기로 의견을 모았습니다. 
              </Typography>
              <Typography className={classes.paragraph}>
                지금까지 살펴본 상황을 전반적으로 고려하여, 이제부터 약 1시간 30분 동안 회원들과 함께 학습활동을 설계해 보시기 바랍니다.
              </Typography>
            </div>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel expanded={expanded === 'panel2'} onChange={this.handleChange('panel2')}>
          <ExpansionPanelSummary
            expandIcon={<ExpandMore style={{color: "white"}}/>}
            aria-controls="panel2bh-content"
            id="panel2bh-header"
            className={classes.headingBackground}
          >
            <Typography className={classes.heading}>학습활동 설계 조건</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <div>
              <Typography>
                <b>A. 학습활동은 자유학기에 기존의 교과에서 다루지 못했던 새로운 주제에 대해 학습할 수 있는 선택 프로그램(1차시: 45분)으로 이루어질 예정입니다.</b>
              </Typography>
              <Typography className={`${classes.tab1} ${classes.info} ${classes.bottom1}`}>
                참고: 자유학기제란? 중학교에서 한 학기 동안 시험 부담에서 벗어나 토론, 실습 및 다양한 체험 활동에 참여하도록 하는 제도입니다. 특히 선택 프로그램에서는 교사의 재량에 따라 다양한 주제의 활동이 진행됩니다.
              </Typography>
              <Typography><b>B. 학습활동 설계 양식은 다음과 같습니다.</b></Typography>
              <Typography className={classes.tab1}>a. 학습목표 (학습자가 수업의 마지막 시점에서 할 수 있는 행동 또는 수행을 명확하게 진술)</Typography>
              <Typography className={classes.tab1}>b. 활동 내용과 순서 (세부적인 활동의 내용을 각 활동에 필요한 시간(분)과 함께 순차적으로 제시)</Typography>
              <Typography className={classes.tab1}>c. 준비물 (수업에 필요한 다양한 교수학습용 자료와 매체로, 예를 들어 교수용 PPT, 학습활동지, 태블릿PC 등)</Typography>
              <Typography className={`${classes.tab1} ${classes.bottom1}`}>d. 지도상의 유의점이나 사전준비사항 (학습지도 과정상 학습자의 능동적 참여를 어떻게 유도하며, 필요한 자원을 어떻게 구할 것인지 등)</Typography>
              <Typography className={classes.bottom1}><b>C. 학습활동은 학생 주도로 이루어지는 참여형 활동으로 설계되어야 합니다.</b></Typography>
              <Typography className={classes.bottom1}><b>D. 교사 A씨가 재직중인 학교는 교육기자재의 신청과 사용이 매우 자유롭습니다.</b></Typography>
              <Typography className={classes.bottom1}><b>E. 1개 차시로 충분한 학습활동이 이루어지기 어렵다고 판단될 경우, 2개 차시 이상의 학습활동을 설계하여도 좋습니다.</b></Typography>
              <Typography><b>F. 교사 연구회의 회원들은 본격적인 학습활동 설계에 앞서 미디어 교육 전문가에게 조언을 구한 결과, 다음과 같은 답변을 받았고, 회원들은 이를 학습활동 설계에 참고하기로 하였습니다.</b></Typography>
              <Typography className={classes.tab1}>
                한국의 미디어 교육은 ‘미디어 내용에 대한 비판적 해독 능력’을 키우는 것과 동일시되어, 미디어 ‘읽기’에만 주력하는 경우가 많았다. 이는 교육 대상이 미디어 ‘수용자’라는 점을 가정해온 것이다. 하지만 미디어 교육은 학습자가 미디어의 역할과 본질을 이해하고 인간 및 사회와의 관계 속에서 미디어를 알맞게 선택, 이용함으로써 능동적인 커뮤니케이션의 주체로서 사유하고 실천할 수 있도록 하는 다양한 활동을 포괄하는 개념이다. 따라서 미디어 읽기에만 치중된 교육을 넘어 미디어의 본질 및 특성을 이해하고, 주체적 미디어 이용 능력을 배양하는 방향으로 미디어 교육의 관점 및 방향을 다양화하려는 노력이 필요하다. 
              </Typography>
            </div>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel expanded={expanded === 'panel3'} onChange={this.handleChange('panel3')}>
          <ExpansionPanelSummary
              expandIcon={<ExpandMore style={{color: "white"}}/>}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
              className={classes.headingBackground}>
            <Typography className={classes.heading}>학습활동 설계 참고자료</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <div>
              <ExpansionPanel expanded={subExpanded === 'panel1'} onChange={this.handleSubChange('panel1')}>
                <ExpansionPanelSummary
                  expandIcon={<ExpandMore style={{color: "white"}}/>}
                  aria-controls="subpanel1bh-content"
                  id="subpanel1bh-header"
                  className={classes.secondaryHeadingBackground}
                >
                  <Typography className={classes.secondaryHeading}>미디어 교육의 단계와 교수-학습 활동</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <div>
                    <Typography>
                      미디어 교육은 크게 4단계로 구분됩니다. 
                    </Typography>
                    <Typography className={classes.bottom1}>
                      <u>한 수업에서 모든 단계를 다루어야 하는 것은 아니며, 교육의 주요 목적에 따라 몇 개의 단계에 초점을 두고 수업이 이루어질 수 있습니다.</u>
                    </Typography>
                    <Typography><b>1단계 - 미디어 접근 교육: </b></Typography>
                    <Typography className={classes.bottom1}>미디어의 특성을 이해하도록 한다. 미디어가 단순한 정보와 메시지를 전달하는 매개체가 아닌, 정보와 메시지의 본질을 바꿀 수 있는 힘을 지니고 있음을 인식하게 한다.</Typography>
                    <Typography><b>2단계 - 콘텐츠 분석 교육: </b></Typography>
                    <Typography className={classes.bottom1}>콘텐츠를 정확히 이해하도록 한다. 콘텐츠에 나타난 용어, 개념에 대해 이해하도록 하고, 콘텐츠의 핵심을 파악, 요약하도록 한다. 또한 콘텐츠에서 제공한 데이터나 근거에 오류가 없는지 확인하고 콘텐츠의 출처를 기록한다.</Typography>
                    <Typography><b>3단계 - 콘텐츠 평가 교육: </b></Typography>
                    <Typography className={classes.bottom1}>파악한 ‘사실’을 바탕으로 콘텐츠가 보여주는 외연적 의미 외에 행간의 의미나 숨은 전제를 파악하는 비판적 사고를 하도록 한다. 콘텐츠가 제공된 시점의 사회적 맥락을 파악하고, 기타 관련 콘텐츠와 비교함으로써 콘텐츠의 진위 여부나 편향 정도 등을 판단한다.</Typography>
                    <Typography><b>4단계 - 콘텐츠 생성 교육: </b></Typography>
                    <Typography className={classes.bottom1}>1-3 단계를 거치면서 형성된 자신의 의견을 가장 효과적이고 효율적으로 드러내기 위한 ‘자기표현’ 을 하도록 한다. 단, 인터넷에 제시된 메시지의 파급력을 고려하여 개인의 의견이 사회가 추구하는 공공의 가치나 공공성에 반대되지 않는지 점검하도록 한다.</Typography>
                  </div>
                </ExpansionPanelDetails>
              </ExpansionPanel>
              <ExpansionPanel expanded={subExpanded === 'panel2'} onChange={this.handleSubChange('panel2')}>
                <ExpansionPanelSummary
                  expandIcon={<ExpandMore style={{color: "white"}}/>}
                  aria-controls="subpanel2bh-content"
                  id="subpanel2bh-header"
                  className={classes.secondaryHeadingBackground}>
                  <Typography className={classes.secondaryHeading}>청소년을 위한 미디어 교육 실천 및 지도 가이드</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <div>
                    <Typography className={classes.paragraph}>다음은 청소년들이 1인 미디어(예: 유튜브)를 적절하게 활용하도록 하기 위한 가이드라인입니다.</Typography>
                    <Typography><b>A. 1인 미디어의 특성을 잘 이해해야 합니다.</b></Typography>
                    <Typography className={classes.tab1}>a. 유튜브는 ‘누구나’ 영상을 ‘업로드’하고 공유할 수 있는 동영상 플랫폼이에요. 따라서 내용과 거짓 정보를 올려도 검증 없이 빠르게 확산될 수 있음에 유의하세요.</Typography>
                    <Typography className={`${classes.tab1} ${classes.paragraph}`}>b. 1인 미디어를 통해 전달되는 정보가 가치 있는 정보인지 판단해보세요.</Typography>

                    <Typography><b>B. 미디어에는 정보가 담겨있다는 것을 기억해야 합니다.</b></Typography>
                    <Typography className={classes.tab1}>a. 어떤 목적으로 미디어 콘텐츠를 만들었을지 생각해요.</Typography>
                    <Typography className={classes.tab1}>b. 미디어 콘텐츠를 누구와 공유하고 싶은지 생각해요.</Typography>
                    <Typography className={classes.tab1}>c. 콘텐츠 생산자는 믿을만한 사람인지 생각해요.</Typography>
                    <Typography className={classes.tab1}>d. 양쪽의 주장을 모두 설명하고 있는지 확인해요.</Typography>
                    <Typography className={`${classes.tab1} ${classes.paragraph}`}>e. 미디어 속 정보가 사실인지 의견인지 구분해요.</Typography>

                    <Typography><b>C. 가짜뉴스를 잘 구별해야 합니다.</b></Typography>
                    <Typography className={classes.tab1}>a. 뉴스의 출처를 확인해요.</Typography>
                    <Typography className={classes.tab1}>b. 뉴스의 작성자가 실존 인물인지, 어떤 이력을 가졌는지 확인해요.</Typography>
                    <Typography className={classes.tab1}>c. 뉴스를 뒷받침하는 정보가 실제 맞는지 판단해요.</Typography>
                    <Typography className={classes.tab1}>d. 뉴스가 제작된 날짜를 확인하여 오래된 뉴스를 재탕하거나 가공한 건 아닌지 확인해요.</Typography>
                    <Typography className={`${classes.tab1} ${classes.paragraph}`}>e. 상반된 입장을 모두 담고 있는지 확인해요.</Typography>
                  </div>
                </ExpansionPanelDetails>
              </ExpansionPanel>
              <ExpansionPanel expanded={subExpanded === 'panel3'} onChange={this.handleSubChange('panel3')}>
                <ExpansionPanelSummary
                  expandIcon={<ExpandMore style={{color: "white"}}/>}
                  aria-controls="subpanel3bh-content"
                  id="subpanel3bh-header"
                  className={classes.secondaryHeadingBackground}>
                  <Typography className={classes.secondaryHeading}>관련 정보 검색 가이드</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <div>
                    <Typography>본 페이지에 제시된 자료 이외에도 여러분은 미디어 교육과 관련하여 인터넷에서 직접 정보를 찾아볼 수 있습니다.</Typography>
                    <Typography className={classes.paragraph}>정보 검색에 참고할 만한 키워드는 다음과 같습니다.</Typography>
                    <Typography className={classes.paragraph}>
                      <a target="_blank" rel="noopener noreferrer" href="https://www.google.com/search?q=미디어교육&oq=미디어교육&aqs=chrome..69i57j0l5.1215j0j8&sourceid=chrome&ie=UTF-8">#미디어 교육</a>&nbsp;&nbsp;&nbsp;
                      <a target="_blank" rel="noopener noreferrer" href="https://www.google.com/search?ei=et1GXdT4POSNr7wP7fSFEA&q=가짜뉴스판별법&oq=가짜뉴스판별법&gs_l=psy-ab.3...91590.91590..91788...0.0..0.132.132.0j1......0....2j1..gws-wiz.......0i71.7WxAQXevfH4&ved=&uact=5">#가짜뉴스 판별법</a>&nbsp;&nbsp;&nbsp;
                      <a target="_blank" rel="noopener noreferrer" href="https://search.naver.com/search.naver?sm=tab_hty.top&where=nexearch&query=정보리터러시&oquery=#정보리터러시&tqi=URkPcwp0JywssjlSWjZssssst80-109856">#정보 리터러시</a>&nbsp;&nbsp;&nbsp;
                      <a target="_blank" rel="noopener noreferrer" href="https://search.naver.com/search.naver?sm=tab_hty.top&where=nexearch&query=미디어+리터러시&oquery=정보리터러시&tqi=URkP4dp0Jy0ssTebzeNssssstUG-388246">#미디어 리터러시</a>&nbsp;&nbsp;&nbsp;
                      <a target="_blank" rel="noopener noreferrer" href="https://search.naver.com/search.naver?where=nexearch&query=미디어+리터러시+교육&ie=utf8&sm=tab_she&qdt=0">#미디어 리터러시 교육</a>&nbsp;&nbsp;&nbsp;
                      <a target="_blank" rel="noopener noreferrer" href="https://search.naver.com/search.naver?sm=tab_hty.top&where=nexearch&query=디지털리터러시&oquery=미디어+리터러시+교육&tqi=URkPSwp0J1ZssQ3PnkVssssstYw-146205">#디지털 리터러시</a>
                    </Typography>
                    <Typography>이 외에도, 방송통신위원회와 한국정보화진흥원에서는 미디어 교육과 관련하여 다음과 같은 <a target="_blank" rel="noopener noreferrer" href="https://www.아인세.kr/main.do">#홈페이지(아름다운인터넷세상)</a> 를 운영하고 있으니 참고하시기 바랍니다.</Typography>
                  </div>
                </ExpansionPanelDetails>
              </ExpansionPanel>
            </div>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </Grid>
    )
  }
}

export default withStyles(ProjectMainStyle)(ProjectDetails);
