import React, { useEffect, useState } from "react";
import { Card, Badge } from "react-bootstrap";
import "./TaskList.css";

const Task = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/tasks/all-tasks")
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="vertical-wrapper">
      <h2 className="vertical-title">📋 Assigned Complaints Timeline</h2>

      {tasks.length === 0 ? (
        <p className="no-tasks">No tasks assigned yet.</p>
      ) : (
        <div className="vertical-stack">
          {tasks.map((task, index) => (
            <div
              key={task.id}
              className="vertical-card-wrapper"
              style={{ "--i": index }}
            >
              <Card className="vertical-card shadow-lg">
                <Card.Header className="bg-gradient text-white">
                  Vendor: {task.assignedVendor}
                </Card.Header>
                <Card.Body>
                  <Card.Title>{task.complaintTitle}</Card.Title>
                  <Card.Subtitle className="mb-2">
                    Category: {task.complaintCategory}
                  </Card.Subtitle>
                  <Card.Text>
                    Raised By: {task.complaintRaisedBy} <br />
                    Original Status: {task.complaintStatus} <br />
                    Assigned Status:{" "}
                    <Badge
                      bg={task.status === "Assigned" ? "warning" : "success"}
                    >
                      {task.status}
                    </Badge>
                  </Card.Text>
                </Card.Body>
                <Card.Footer className="text-end">
                  Assigned On: {new Date(task.assignedTime).toLocaleString()}
                </Card.Footer>
              </Card>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Task;
