import { LitElement, html, svg } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("trnr-dial")
export class TrnrDial extends LitElement {

  @property() diameter: number = 200;
  @property() color: string = "white";

  render() {
    const radius = this.diameter / 2;
    const labelRadius = radius * 0.9;
    const outerRadius = radius * 0.85;
    const middleRadius = radius * 0.8;
    const innerRadius = radius * 0.45;

    return html`
      <svg width=${this.diameter} height=${this.diameter}>
        ${this.drawArc(this.diameter / 2, this.diameter / 2, middleRadius)}
        ${this.drawArc(this.diameter / 2, this.diameter / 2, innerRadius)}
        ${this.drawLines(5, middleRadius, outerRadius)}
        ${this.drawSegments(0.5, 33, innerRadius, middleRadius)}
      <path />
    </svg>
    `;
  }

  private drawArc(x: number, y: number, radius: number) {
    const startAngle = 226;
    const endAngle = 134;
    const start = this.polarToCartesian(x, y, radius, endAngle);
    const end = this.polarToCartesian(x, y, radius, startAngle);

    return svg`<path
        d="M ${start.x} ${start.y} A ${radius} ${radius} 0 1 0 ${end.x} ${end.y}"
        vectorEffect="non-scaling-stroke"
        fill="none"
        stroke="${this.color}"
      />`;
  }

  private polarToCartesian(
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


  private drawLines(numLines: number, innerRadius: number, outerRadius: number) {
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

  private drawLine(
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
        stroke="${this.color}"
      />`;
  };

  private getPointCoordinates(value: number, radius: number) {
    const gap = 0.255;
    const adjustedValue = value * (1 - gap);
    const theta = 2 * Math.PI * (adjustedValue + 0.25 + gap / 2);
    const x = this.diameter / 2 + radius * Math.cos(theta);
    const y = this.diameter / 2 + radius * Math.sin(theta);
    return [x, y];
  };

  private drawSegments(
    value: number,
    segments: number,
    innerRadius: number,
    outerRadius: number,
  ) {
    const getSegments = (parts: number, span: number) => {
      const internalParts = parts * span - 1;
      const getSegment = (index: number, parts: number) => {
        return (1 / parts) * index;
      };
      const segments = [];
      for (let i = 0; i < internalParts; i += span) {
        const from = getSegment(i, internalParts);
        const to = getSegment(i + (span - 1), internalParts);
        segments.push({ from, to });
      }
      return segments;
    };

    const adjustedValue = value * segments;
    const _value = Math.floor(adjustedValue);
    const decimals = (adjustedValue - _value) * 0.9 + 0.1;

    return svg`
      ${getSegments(segments, 4).map((segment, index) => (
      this.drawSegmentPolygon(
        segment.from,
        segment.to,
        outerRadius,
        innerRadius,
        index < _value ? 1 : index > _value ? 0.1 : decimals
      )
    ))}`;
  };

  private drawSegmentPolygon(
    from: number,
    to: number,
    outerRadius: number,
    innerRadius: number,
    opacity: number,
  ) {
    const _outerRadius = outerRadius - 4;
    const _innerRadius = innerRadius + 4;

    const [x1, y1] = this.getPointCoordinates(from, _innerRadius);
    const [x2, y2] = this.getPointCoordinates(from, _outerRadius);
    const [x3, y3] = this.getPointCoordinates(to, _outerRadius);
    const [x4, y4] = this.getPointCoordinates(to, _innerRadius);

    return svg`
      <polygon
        points="${x1},${y1} ${x2},${y2} ${x3},${y3} ${x4},${y4}"
        fill="${this.color}"
        opacity="${opacity}"
      />`;
  }
}