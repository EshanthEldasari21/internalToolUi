import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "../components/ui/dialog";

import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";

const WorkItems = () => {
  const [taskOpen, setTaskOpen] = useState(false);

  const [tasks, setTasks] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    workItemType: "",
    assignee: "",
    sprint: "",
    status: "",
    description: "",
    comments: "",
  });

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(storedTasks);
  }, []);

  const handletaskcreation = () => {
    const newTask = {
      id: Date.now(),
      ...formData,
      createdAt: new Date().toISOString(),
    };

    const updatedTasks = [...tasks, newTask];

    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    setTasks(updatedTasks);

    setFormData({
      title: "",
      workItemType: "",
      assignee: "",
      sprint: "",
      status: "",
      description: "",
      comments: "",
    });

    setTaskOpen(false);
  };

  return (
    <>
      {/* Dialog */}
      <Dialog open={taskOpen} onOpenChange={setTaskOpen}>
        <DialogContent className="sm:max-w-lg p-6 rounded-xl">
          <DialogHeader>
            <DialogTitle>New Work Item</DialogTitle>
            {/* <DialogDescription>
              Fill in the details below and click save
            </DialogDescription> */}
          </DialogHeader>

          <div className="grid gap-4 py-2">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label className="py-2">Title</Label>
                <Input
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  placeholder="Enter work item title"
                />
              </div>

              <div>
                <Label className="py-2">Work Item Type</Label>
                <Select
                  value={formData.workItemType}
                  onValueChange={(value) =>
                    setFormData({ ...formData, workItemType: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="Bug">Bug</SelectItem>
                    <SelectItem value="Feature">Feature</SelectItem>
                    <SelectItem value="User Story">User Story</SelectItem>
                    <SelectItem value="Epic">Epic</SelectItem>
                    <SelectItem value="Issue">Issue</SelectItem>
                    <SelectItem value="Task">Task</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <Label className="py-2">Assigned To</Label>
                <Select
                  value={formData.assignee}
                  onValueChange={(value) =>
                    setFormData({ ...formData, assignee: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select user" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="Eshanth">Eshanth</SelectItem>
                    <SelectItem value="Ajith">Ajith</SelectItem>
                    <SelectItem value="Nikhil">Nikhil</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="py-2">Sprint</Label>
                <Select
                  value={formData.sprint}
                  onValueChange={(value) =>
                    setFormData({ ...formData, sprint: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select sprint" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="Sprint 1">Sprint 1</SelectItem>
                    <SelectItem value="Sprint 2">Sprint 2</SelectItem>
                    <SelectItem value="Sprint 3">Sprint 3</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="py-2">Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) =>
                    setFormData({ ...formData, status: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="New">New</SelectItem>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Resolved">Resolved</SelectItem>
                    <SelectItem value="Closed">Closed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label className="py-2">Description</Label>
              <Textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
            </div>

            <div>
              <Label className="py-2">Comments</Label>
              <Textarea
                value={formData.comments}
                onChange={(e) =>
                  setFormData({ ...formData, comments: e.target.value })
                }
              />
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>

            <Button onClick={handletaskcreation}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Page */}
      <div style={{ marginLeft: "220px", color: "black", marginTop: "70px" }}>
        <p style={{ fontSize: "18px", color: "#5C5C5C" }}>Work Items</p>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "15px",
            border: "1px solid #D9D9D9",
            padding: "10px",
            backgroundColor: "#D9D9D9",
          }}
        >
          <p style={{ cursor: "pointer" }} onClick={() => setTaskOpen(true)}>
            + New work item
          </p>
          <div style={{ display: "flex", gap: "20px" }}>
            <select style={{ backgroundColor: "#D9D9D9", outline: "none" }}>
              <option>Types</option> <option value="Bugs">Bugs</option>{" "}
              <option value="User Story">User Story</option>{" "}
            </select>{" "}
            <select style={{ backgroundColor: "#D9D9D9", outline: "none" }}>
              {" "}
              <option>Assigned to</option>{" "}
              <option value="Eshanth">Eshanth</option>{" "}
              <option value="Ajith">Ajith</option>{" "}
            </select>{" "}
            <select style={{ backgroundColor: "#D9D9D9", outline: "none" }}>
              {" "}
              <option>States</option> <option value="New">New</option>{" "}
              <option value="Active">Active</option>{" "}
              <option value="Resolved">Resolved</option>{" "}
              <option value="Closed">Closed</option>{" "}
            </select>{" "}
            <select style={{ backgroundColor: "#D9D9D9", outline: "none" }}>
              {" "}
              <option>Iteration</option> <option value="S1">Sprint 1</option>{" "}
              <option value="S2">Sprint 2</option>{" "}
              <option value="S3">Sprint 3</option>{" "}
            </select>{" "}
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "100px 1fr 200px 150px",
            marginTop: "20px",
            padding: "10px",
            fontWeight: "650",
            marginLeft: "20px",
          }}
        >
          <p>ID</p>
          <p>Title</p>
          <p>Assigned To</p>
          <p>State</p>
        </div>

        <hr />

        {tasks.map((task) => (
          <div
            key={task.id}
            style={{
              display: "grid",
              gridTemplateColumns: "100px 1fr 200px 150px",
              padding: "4px",
              marginTop: "6px",
              marginLeft: "20px",
            }}
          >
            <p>{String(task.id).slice(-3)}</p>
            <p>{task.title}</p>
            <p>{task.assignee}</p>
            <p>{task.status}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default WorkItems;
