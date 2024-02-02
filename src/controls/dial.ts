import { LitElement, html, svg } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("trnr-dial")
export class TrnrDial extends LitElement {
  render() {

    const diameter = 200;

    const radius = diameter / 2;
    const labelRadius = radius * 0.9;
    const outerRadius = radius * 0.85;
    const middleRadius = radius * 0.8;
    const innerRadius = radius * 0.45;

    return html`
      <svg width=${diameter} height=${diameter}>
        ${this.drawArc(diameter / 2, diameter / 2, middleRadius)}
        ${this.drawArc(diameter / 2, diameter / 2, innerRadius)}
        ${this.drawLines(5, middleRadius, outerRadius)}
      <path />
    </svg>
    `;
  }

  drawArc(x: number, y: number, radius: number) {
    const startAngle = 226;
    const endAngle = 134;
    const start = this.polarToCartesian(x, y, radius, endAngle);
    const end = this.polarToCartesian(x, y, radius, startAngle);

    return svg`<path
        d="M ${start.x} ${start.y} A ${radius} ${radius} 0 1 0 ${end.x} ${end.y}"
        vectorEffect="non-scaling-stroke"
        fill="none"
        stroke="white"
      />`;
  }

  polarToCartesian(
    centerX: number,
    centerY: number,
    radius: number,
    angleInDegrees: number
  ) {
    const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
    return {
      x: centerX + radius * Math.cos(angleInRadians),
      y: centerY + radius * Math.sin(angleInRadians),
    };
  }


  drawLines(numLines: number, innerRadius: number, outerRadius: number) {
    const lines = [];
    for (let i = 0; i < numLines; i++) {
      lines.push(i / (numLines - 1));
    }

    return svg`${lines.map((value) => (
      this.drawLine(
        value,
        innerRadius,
        outerRadius
      )
    ))}`;
  }

  drawLine(
    degree: number,
    innerRadius: number,
    outerRadius: number,
  ) {
    const [x1, y1] = this.getPointCoordinates(degree, innerRadius);
    const [x2, y2] = this.getPointCoordinates(degree, outerRadius);

    return svg`<line
        x1="${x1}"
        y1="${y1}"
        x2="${x2}"
        y2="${y2}"
        vectorEffect="non-scaling-stroke"
        strokeLinecap="round"
        stroke="white"
      />`;
  };

  getPointCoordinates(value: number, radius: number) {
    const gap = 0.255;
    const adjustedValue = value * (1 - gap);
    const theta = 2 * Math.PI * (adjustedValue + 0.25 + gap / 2);
    const x = 100 + radius * Math.cos(theta);
    const y = 100 + radius * Math.sin(theta);
    return [x, y];
  };
}