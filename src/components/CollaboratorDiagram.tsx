import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

interface Collaborator {
  name: string;
  collaborationDate: Date;
}

interface CollaboratorDiagramProps {
  owner: string;
  collaborators: Collaborator[];
}

const CollaboratorDiagram: React.FC<CollaboratorDiagramProps> = ({ owner, collaborators }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    const width = 800;
    const height = 600;

    const tree = d3.tree<{ name: string; children?: Collaborator[] }>().size([width, height]);

    const nodes = tree(
      d3.hierarchy<{ name: string; children?: Collaborator[] }>(
        { name: owner, children: collaborators },
        (d) => d.children
      )
    );

    // const link = svg
    //   .selectAll(".link")
    //   .data(nodes.descendants().slice(1))
    //   .enter()
    //   .append("path")
    //   .attr("class", "link")
    //   .attr("d", (d) => {
    //     const startPoint = [d.parent!.x, d.parent!.y];
    //     const endPoint = [d.x, d.y];
    //     const midPoint = [(startPoint[0] + endPoint[0]) / 2, startPoint[1]];
    //     const curveLength = Math.abs(
    //       (new Date(d.data.collaborationDate).getTime() - new Date().getTime()) /
    //         (1000 * 60 * 60 * 24 * 30)
    //     ); // Adjust the curve length based on the collaboration date
    //     return `M${startPoint[0]},${startPoint[1]}C${midPoint[0]},${
    //       midPoint[1] + curveLength
    //     } ${midPoint[0]},${endPoint[1] - curveLength} ${endPoint[0]},${
    //       endPoint[1]
    //     }`;
    //   })
    //   .attr("stroke", "gray")
    //   .attr("fill", "none");

    const node = svg
      .selectAll(".node")
      .data(nodes.descendants())
      .enter()
      .append("g")
      .attr("class", "node")
      .attr("transform", (d) => `translate(${d.x},${d.y})`);

    node
      .append("circle")
      .attr("r", 10)
      .attr("fill", (d) => (d.children ? "lightsteelblue" : "#fff"))
      .attr("stroke", "steelblue");

    node
      .append("text")
      .attr("dy", "0.35em")
      .attr("x", (d) => (d.children ? -13 : 13))
      .attr("text-anchor", (d) => (d.children ? "end" : "start"))
      .text((d) => d.data.name);
  }, [owner, collaborators]);
  return <svg ref={svgRef} width={800} height={600} />;
};

export default CollaboratorDiagram;