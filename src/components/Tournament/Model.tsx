import {IDraw} from "../../objects/fightModel/draws/IDraw";
import RoundRobinDraw from "../../objects/fightModel/draws/RoundRobinDraw";
import Competitor from "../../objects/Competitor";
import {IDrawVisualizer} from "../../objects/fightModel/draws/IDrawVisualizer";
import RoundRobinDrawVisualizer from "../../objects/fightModel/draws/RoundRobinVisualizer";
import TreeDrawUnder8 from "../../objects/fightModel/draws/TreeDrawUnder8";
import TreeDrawUnder16 from "../../objects/fightModel/draws/TreeDrawUnder16";

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
    this.draw = new TreeDrawUnder16(competitors);
  }
}