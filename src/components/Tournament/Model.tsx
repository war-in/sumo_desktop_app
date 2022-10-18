import {IDraw} from "../../objects/fightModel/draws/IDraw";
import RoundRobinDraw from "../../objects/fightModel/draws/RoundRobinDraw";
import Competitor from "../../objects/Competitor";
import {IDrawVisualizer} from "../../objects/fightModel/draws/IDrawVisualizer";
import RoundRobinDrawVisualizer from "../../objects/fightModel/draws/RoundRobinVisualizer";
import TreeDrawUnder8 from "../../objects/fightModel/draws/TreeDrawUnder8";
import TreeDrawUnder16 from "../../objects/fightModel/draws/TreeDrawUnder16";
import TreeDrawUnder16Visualizer from "../../objects/fightModel/draws/TreeDrawUnder16Visualizer";
import TreeDrawUnder8Visualizer from "../../objects/fightModel/draws/TreeDrawUnder8Visualizer";

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
  nr: string,
  id: number,
}

export class Model {
  drawFromDatabase: DrawFromDatabase;
  rowData: RowData;
  draw: IDraw;
  drawVisualizer: IDrawVisualizer;

  constructor(drawFromDatabase: DrawFromDatabase, rowData: RowData, competitors: Competitor[], saveFightsToDatabase: boolean) {
    this.drawFromDatabase = drawFromDatabase;
    this.rowData = rowData;
    if (competitors.length == 16) {
      this.draw = new TreeDrawUnder16(competitors, rowData.id, saveFightsToDatabase);
      this.drawVisualizer = new TreeDrawUnder16Visualizer(this.draw as TreeDrawUnder16)
    } else if (competitors.length == 8) {
      this.draw = new TreeDrawUnder8(competitors, rowData.id, saveFightsToDatabase);
      this.drawVisualizer = new TreeDrawUnder8Visualizer(this.draw as TreeDrawUnder8)
    } else {
      this.draw = new RoundRobinDraw(competitors, rowData.id, saveFightsToDatabase);
      this.drawVisualizer = new RoundRobinDrawVisualizer(this.draw as RoundRobinDraw)
    }

  }
}