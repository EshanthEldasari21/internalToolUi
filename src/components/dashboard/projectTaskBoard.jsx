import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Plus, Search } from "lucide-react";
import { useParams } from "react-router-dom";
import { IoFilterOutline } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";


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
  const [filterMode, setFilterMode] = useState(false);
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
const filterFunction = () => {
setFilterMode(true);
}

  const handleEditTask = (updatedTask) => {
    const updatedTasks = tasks.map((task) =>
      task.id === updatedTask.id ? updatedTask : task
    );

    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    console.log(updatedTasks);
    setTasks(updatedTasks);
  };

  const renderColumn = (status) => (
    <div className="flex flex-col gap-4 bg-white rounded-xl border border-gray-200 shadow-sm p-4 min-w-[200px]">
      <p className="text-center font-semibold text-gray-700 border-b pb-2 text-sm tracking-wide">
        {status}
      </p>
      <div className="flex flex-col gap-3">
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

    </div>
  );

  return (

   
    <div
      style={{
        marginLeft: "186px",
        marginTop: "40px",
        width: "calc(100% - 186px)",
      }}
      className="bg-slate-50 min-h-screen px-6 py-6"
    >
      <div className="projectStatus mb-4">
        <h1 className="font-bold ml-8 text-2xl text-gray-800 tracking-tight">
          {projectName}
        </h1>
      </div>

      <div className="flex items-center justify-end gap-4 mt-2" style={{ marginTop: "-5px",  }}>
        <div className="flex items-center gap-1 px-3 py-1 bg-white border border-gray-200 rounded-md shadow-sm cursor-pointer"  onClick={()=> filterFunction()} style={{height: "4vh", fontSize: "13px"}} >
          
            <IoFilterOutline className="w-4 h-4"  />
            Filter
         
        </div>
        <div className="flex-1 max-w-sm relative flex items-center" style={{ maxWidth: "180px",  }}>
          <Search className="absolute left-3 w-4 h-4 text-gray-400"  />
          <Input
            placeholder="Search tasks..."
            className="pl-10 h-7 bg-white border border-gray-200 shadow-sm"
          />
        </div>
      </div>

      <div>
        {filterMode && (
          <div className="mt-4 p-2 bg-white border border-gray-200 rounded-md shadow-sm" > 
           <div style={{display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "20px", }}>
            <select name="" id="">
              <option value="">Types</option>
              <option value="Bugs">Bugs</option>
              <option value="User Story">User Story</option>
            </select>
            <select name="" id="">
              <option value="">Assigned to</option>
              <option value="Eshanth">Eshanth</option>
              <option value="Ajith">Ajith</option>
            </select>
            <select name="" id="">
              <option value="">States</option>
              <option value="New">New</option>
              <option value="Active">Active</option>
              <option value="Resolved">Resolved</option>
              <option value="Closed">Closed</option>
            </select>
            <select name="" id="">
              <option value="">Iteration</option>
              <option value="S1">Sprint 1</option>
              <option value="S2">Sprint 2</option>
              <option value="S3">Sprint 3</option>
            </select>
              <Button variant="outline" size="sm" onClick={() => setFilterMode(false)}>
               <IoMdClose />
              </Button>
           </div>
          </div>
        )}
      </div>

      <div
        className="mt-6 bg-gray-50 p-6 rounded-xl min-h-[540px] border shadow-inner"
        style={{ paddingLeft: "20px" }}
      >
        {/* 4 COLUMN BOARD */}
        <div className="grid grid-cols-4 gap-6">

          {/* NEW COLUMN */}
          <div className="flex flex-col gap-4 bg-white rounded-xl border border-gray-200 shadow-sm p-4" >
            <p className="text-center font-semibold text-gray-700 border-b pb-2 text-sm tracking-wide">
              New
            </p>

            <Dialog>
              <DialogTrigger asChild>
                <Button
                  className="flex items-center gap-2 w-full bg-black hover:bg-gray-800 text-white shadow-sm"
                  style={{ height: "5vh", width: "100%" }}
                >
                  <Plus className="w-4 h-4" />
                  New Task
                </Button>
              </DialogTrigger>

              <DialogContent className="sm:max-w-lg p-6 rounded-xl">
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
                        className="border-gray-200 focus:ring-2 focus:ring-gray-300"
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
                        <SelectTrigger className="border-gray-200">
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
                        <SelectTrigger className="border-gray-200">
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
                        <SelectTrigger className="border-gray-200">
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
                        <SelectTrigger className="border-gray-200">
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
                      className="border-gray-200 focus:ring-2 focus:ring-gray-300"
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({ ...formData, description: e.target.value })
                      }
                    />
                  </div>

                  <div>
                    <Label className="py-2">Comments</Label>
                    <Textarea
                      className="border-gray-200 focus:ring-2 focus:ring-gray-300"
                      value={formData.comments}
                      onChange={(e) =>
                        setFormData({ ...formData, comments: e.target.value })
                      }
                    />
                  </div>

                </div>

                <DialogFooter className="pt-4 border-t">
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

            <div className="flex flex-col gap-3">
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



