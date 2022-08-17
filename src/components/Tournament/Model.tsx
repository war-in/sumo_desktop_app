import {IDraw} from "../../objects/fightModel/draws/IDraw";
import RoundRobinDraw from "../../objects/fightModel/draws/RoundRobinDraw";
import Competitor from "../../objects/Competitor";

export type DrawType = {
  numberOfCompetitors: number,
  region: string,
  numberOfRounds: bigint,
  roundNames: [name: string]
}

export type RowData = {
  weight: string,
  age: string,
  sex: string,
  nr: string
}

export class Model {
  drawType: DrawType;
  rowData: RowData;
  draw: IDraw;

  constructor(drawType: DrawType, rowData: RowData, competitors: Competitor[]) {
    this.drawType = drawType;
    this.rowData = rowData;
    this.draw = new RoundRobinDraw(competitors);
  }
}