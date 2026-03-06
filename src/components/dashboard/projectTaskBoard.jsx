 import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Plus, Search } from "lucide-react";
import { useParams } from "react-router-dom";
import TaskCard from "./TaskCard";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "../ui/dialog";
import { Textarea } from "../ui/textarea";
import { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export default function TaskBoard() {
  const [tasks, setTasks] = useState([]);
const { projectName } = useParams();
 console.log(projectName);
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
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(savedTasks);
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
  };

  const handleEditTask = (updatedTask) => {
    const updatedTasks = tasks.map((task) =>
      task.id === updatedTask.id ? updatedTask : task
    );

    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    setTasks(updatedTasks);
  };

  const renderColumn = (status) => (
    <div className="flex flex-col gap-4 w-42 ">
      <p className="text-center font-medium" style={{fontSize: "15px"}}>{status}</p>
      {tasks
        .filter((task) => task.status === status)
        .map((task) => (
       
          <TaskCard
            key={task.id}
            task={task}
            onEdit={handleEditTask}
            
          />
        
        ))}
    </div>
  );

  return (
   
 <div style={{marginLeft :"186px", marginTop: "60px", marginRight: "-20px", width: "calc(100% - 186px)"}} >
    <div className="projectStatus">
      <h1 className="font-bold ml-8 text-2xl">
     {projectName}
      </h1>
    </div>

    <div className="flex items-center justify-end gap-4 mt-1">
      <div className="flex-1 max-w-sm relative flex items-center">
        <Search className="absolute left-3 w-4 h-4 text-gray-400" />
        <Input placeholder="Search tasks..." className="pl-10" />
      </div>
    </div>

    <div className="mt-6 bg-gray-100 p-6 rounded-md min-h-[540px]" style={{  marginRight: "-20px", paddingLeft: "20px"}}>

      <div className="flex  overflow-x-auto items-start" style={{gap: "150px"}}>

        
        <div className="flex flex-col gap-4 ">
          <p className="text-center font-semibold" style={{fontSize: "15px"}}>New</p>

          <Dialog>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2" style={{height: "5vh", width: "100%"}} >
                <Plus className="w-4 h-4" />
                New Task
              </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-lg p-4">
              <DialogHeader>
                <DialogTitle>Create Task</DialogTitle>
                <DialogDescription>
                  Fill in the details below and click save
                </DialogDescription>
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
                        <SelectItem value="Test Case">Test Case</SelectItem>
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
                        <SelectItem value="Anirudh">Anirudh</SelectItem>
                        <SelectItem value="Swati">Swati</SelectItem>
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

                <DialogClose asChild>
                  <Button onClick={handletaskcreation}>
                    Save
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>


          {tasks
            .filter((task) => task.status === "New")
            .map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onEdit={handleEditTask}
              />
            ))}
        </div>

        {/* OTHER COLUMNS */}
        {renderColumn("Active")}
        {renderColumn("Resolved")}
        {renderColumn("Closed")}

      </div>
    </div>
    </div>
  );
}
 
 
 
