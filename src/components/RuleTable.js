import React, { Component } from 'react';
import {Table, TableBody, TableRow, TableCell, Checkbox} from "@material-ui/core";
import {ruleConst} from "../store/reducers/rules";
import RuleTableStyle from "../styles/RuleTable";
import {withStyles} from "@material-ui/core/styles";

export class RuleTable extends Component {

  render() {
    const {communication, positiveVibe, mission, comprehension, checkRule, classes} = this.props;

    return (
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>
              <Checkbox
                checked={communication}
                onChange={() => checkRule(ruleConst.communication)}/>
            </TableCell>
            <TableCell className={classes.ruleNameCell}>
              활발한<br/>의사소통
            </TableCell>
            <TableCell className={classes.ruleContentCell}>
              <ul>
                <li>우리 팀 구성원들이 각자의 의견을 적극적으로 제시하고, 제시된 의견에 대한 토론이 충분히 이루어지고 있는지 점검하는 것입니다.</li>
                <li>때로는 각자의 의견을 통합해 하나의 결론을 빨리 내리는 것이 중요해 보이기도 하지만, 팀의 성과를 높이기 위해서는 충분히 의사소통한 다음 결론을 내리거나 진도를 나가는 것이 더 중요합니다.</li>
              </ul>
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell>
              <Checkbox
                checked={positiveVibe}
                onChange={() => checkRule(ruleConst.positiveVibe)}/>
            </TableCell>
            <TableCell className={classes.ruleNameCell}>
              긍정적인<br/>팀 분위기
            </TableCell>
            <TableCell className={classes.ruleContentCell}>
              <ul>
                <li>팀 학습 분위기를 긍정적으로 유지하고 있는지 점검하는 것입니다.</li>
                <li>팀 학습 성과를 높이기 위해서는 구성원 간에 갈등이 생겼을 때, 회피하지 않고 적극적으로 해결하려는 노력을 하는 것이 중요합니다.</li>
                <li>또한, 팀 활동에 대해 스트레스를 받거나 어려움을 겪는 구성원이 있는지 관심을 기울이고, 충분한 공감과 배려, 위로와 지지가 이루어지고 있는지 점검해야 합니다.</li>
              </ul>
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell>
              <Checkbox
                checked={mission}
                onChange={() => checkRule(ruleConst.mission)}/>
            </TableCell>
            <TableCell className={classes.ruleNameCell}>
              문제의<br/>조건달성
            </TableCell>
            <TableCell className={classes.ruleContentCell}>
              <ul>
                <li>학습활동 설계에 고려해야 할 조건이 어느 정도 달성되고 있는지 점검하는 것입니다.</li>
                <li>어떤 조건이 제시되었는지 지속적으로 확인하고, 각 조건이 어느 정도로 달성되었는가를 살펴보는 것이 중요합니다.</li>
              </ul>
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell>
              <Checkbox
                checked={comprehension}
                onChange={() => checkRule(ruleConst.comprehension)}/>
            </TableCell>
            <TableCell className={classes.ruleNameCell}>
              팀원의<br/>이해도 점검
            </TableCell>
            <TableCell className={classes.ruleContentCell}>
              <ul>
                <li>문제에 제시된 정보, 토론이 진행되는 중에 새롭게 제안되는 아이디어 등에 대해 팀원들이 정확히 이해하고 있는지 점검하는 것입니다.</li>
                <li>효과적인 문제해결을 위해서는 모두가 문제와 해결과정, 해결책에 대해 제대로 이해하는 것이 중요합니다.</li>
              </ul>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    )
  }
}

export default withStyles(RuleTableStyle)(RuleTable)