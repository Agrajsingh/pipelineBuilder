from collections import defaultdict, deque
from typing import Any

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel


class PipelineNode(BaseModel):
    id: str
    type: str | None = None
    data: dict[str, Any] | None = None


class PipelineEdge(BaseModel):
    id: str | None = None
    source: str
    target: str
    sourceHandle: str | None = None
    targetHandle: str | None = None


class PipelineRequest(BaseModel):
    nodes: list[PipelineNode] = []
    edges: list[PipelineEdge] = []


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def is_directed_acyclic_graph(nodes: list[PipelineNode], edges: list[PipelineEdge]) -> bool:
    node_ids = {node.id for node in nodes}

    if any(edge.source not in node_ids or edge.target not in node_ids for edge in edges):
        return False

    graph = defaultdict(list)
    indegree = {node_id: 0 for node_id in node_ids}

    for edge in edges:
        graph[edge.source].append(edge.target)
        indegree[edge.target] += 1

    queue = deque(node_id for node_id, degree in indegree.items() if degree == 0)
    visited = 0

    while queue:
        node_id = queue.popleft()
        visited += 1

        for neighbor in graph[node_id]:
            indegree[neighbor] -= 1
            if indegree[neighbor] == 0:
                queue.append(neighbor)

    return visited == len(node_ids)


@app.get("/")
def read_root():
    return {"Ping": "Pong"}


@app.post("/pipelines/parse")
def parse_pipeline(pipeline: PipelineRequest):
    return {
        "num_nodes": len(pipeline.nodes),
        "num_edges": len(pipeline.edges),
        "is_dag": is_directed_acyclic_graph(pipeline.nodes, pipeline.edges),
    }
