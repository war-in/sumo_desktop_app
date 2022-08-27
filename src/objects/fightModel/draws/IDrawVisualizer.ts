import IndividualMatch from "../IndividualMatch";
import {Round} from "../Round";
import Competitor from "../../Competitor";
import {IDraw} from "./IDraw";
import React from "react";

export interface IDrawVisualizer {
    draw:IDraw
    getSlidesForRounds():React.ReactNode[]
}