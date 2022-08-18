import {IDraw} from "../../objects/fightModel/draws/IDraw";
import RoundRobinDraw from "../../objects/fightModel/draws/RoundRobinDraw";
import Competitor from "../../objects/Competitor";

export type DrawFromDatabase = {
  id: number,
  drawType: {
    numberOfCompetitors: number,
    region: string,
    numberOfRounds: bigint,
    roundNames: [name: string]
  }
}

export type RowData = {
  weight: string,
  age: string,
  sex: string,
  nr: string
}

export class Model {
  drawFromDatabase: DrawFromDatabase;
  rowData: RowData;
  draw: IDraw;

  constructor(drawFromDatabase: DrawFromDatabase, rowData: RowData, competitors: Competitor[]) {
    this.drawFromDatabase = drawFromDatabase;
    this.rowData = rowData;
    // @ts-ignore
    this.draw = new RoundRobinDraw(competitors);
  }
}