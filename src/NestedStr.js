import React, { useState } from "react";

function NestedStr() {
	const [nodes, setNodes] = useState([{ id: 1, value: "", children: [] }]);
	console.log("NODES: ", nodes);

	const addChild = (parentId) => {
		const newChild = { id: Date.now(), value: "", children: [] };
		const updatedNodes = traverseNodes(
			nodes,
			parentId,
			(node) => ({
				...node,
				children: [...node.children, newChild],
			}),
			false
		);
		setNodes(updatedNodes);
	};

	const deleteNode = (nodeId) => {
		const updatedNodes = traverseNodes(nodes, nodeId, () => {}, true);
		setNodes(updatedNodes);
	};

	const handleInputChange = (nodeId, value) => {
		const updatedNodes = traverseNodes(nodes, nodeId, (node) => ({
			...node,
			value,
		}));
		setNodes(updatedNodes);
	};

	const traverseNodes = (nodes, nodeId, callback, isDeleteCall) => {
		return nodes.map((node) => {
			if (node.id === nodeId && !isDeleteCall) {
				return callback(node);
			}

			if (node.children && node.children.length > 0) {
				if (node.children.find((n) => n.id === nodeId) && isDeleteCall) {
					return {
						...node,
						children: [...node.children.filter((n) => n.id !== nodeId)],
					};
				}

				return {
					...node,
					children: traverseNodes(
						node.children,
						nodeId,
						callback,
						isDeleteCall
					),
				};
			}

			return node;
		});
	};

	const renderNode = (node) => (
		<div
			key={node.id}
			style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}
		>
			<input
				style={{
					height: "20px",
					border: "1px solid black",
					borderRadius: "2px",
				}}
				type="text"
				value={node.value}
				onChange={(e) => handleInputChange(node.id, e.target.value)}
			/>

			<button
				onClick={() => addChild(node.id)}
				style={{
					padding: "1px 10px",
					backgroundColor: "aliceblue",
					fontSize: "10px",
					border: "none",
					borderRadius: "5px",
					marginLeft: "5px",
				}}
			>
				Add Child
			</button>

			{node.id !== 1 && (
				<button
					onClick={() => deleteNode(node.id)}
					style={{
						padding: "1px 10px",
						backgroundColor: "aliceblue",
						fontSize: "10px",
						border: "none",
						borderRadius: "5px",
						marginLeft: "5px",
					}}
				>
					Delete Node
				</button>
			)}
			<div style={{ marginLeft: "20px" }}>{node.children.map(renderNode)}</div>
		</div>
	);

	return <div>{nodes.map(renderNode)}</div>;
}

export default NestedStr;
