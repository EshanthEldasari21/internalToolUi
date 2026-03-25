import { useState, useMemo } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BsThreeDots } from "react-icons/bs";

import {
  faUser,
  faBug,
  faBolt,
  faClipboardList,
  faRocket,
  faCircleCheck,
  faCircleXmark,
  faCircle,
  faTag,
} from "@fortawesome/free-solid-svg-icons";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent
} from "@/components/ui/dropdown-menu";

export default function TaskCard({ task, onEdit }) {

  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(task);
  const [taskOpen, setTaskOpen] = useState(false);

  const [comments, setComments] = useState(
    Array.isArray(task.comments) ? task.comments : []
  );
 
  const [newComment, setNewComment] = useState("");
const [estimatedHours, setEstimatedHours] = useState(task.estimatedHours || "");  


// const [taskDate, setTaskDate] =  useState("");
// const [taskTimeDetails, setTaskTimeDetails]= useState({
//   startTime: "",
//   endTime: ""
// });

const [workLogs, setWorkLogs] = useState([]);

const [logInput, setLogInput] = useState({
  date: "",
  startTime: "",
  endTime: ""
});
  const [subtasks, setSubtasks] = useState(
    Array.isArray(task.subtasks) ? task.subtasks : []
  );

  const [newSubtask, setNewSubtask] = useState("");
const addWorkLog = () => {
  if (!logInput.date || !logInput.startTime || !logInput.endTime) return;

  const newLog = {
    ...logInput,
    id: Date.now()
  };

  setWorkLogs([...workLogs, newLog]);

  setLogInput({
    date: "",
    startTime: "",
    endTime: ""
  });
};
const totalWorkHours = useMemo(() => {
  let totalMinutes = 0;

  workLogs.forEach((log) => {
    const start = new Date(`${log.date}T${log.startTime}`);
    const end = new Date(`${log.date}T${log.endTime}`);

    const diff = end - start;

    if (diff > 0) {
      totalMinutes += diff / (1000 * 60);
    }
  });

  const hours = Math.floor(totalMinutes / 60);
  const minutes = Math.floor(totalMinutes % 60);

  return `${hours}h ${minutes}m`;
}, [workLogs]);
  const handleSave = () => {
    onEdit({ ...editData, comments, subtasks, estimatedHours, workLogs, logInput });
    setIsEditing(false);
  };

  const addComment = () => {
    if (!newComment.trim()) return;

    const comment = {
      author: "Eshanth",
      text: newComment,
      date: new Date().toLocaleString()
    };

    setComments([...comments, comment]);
    setNewComment("");
  };

  const addSubtask = () => {
    if (!newSubtask.trim()) return;

    const subtask = {
      title: newSubtask,
      done: false
    };

    setSubtasks([...subtasks, subtask]);
    setNewSubtask("");
  };

  const workTypeIcons = {
    Bug: faBug,
    Feature: faBolt,
    Task: faClipboardList,
    Issue: faTag,
    Epic: faTag,
    "User Story": faTag,
    "Test Case": faClipboardList,
  };

  const statusIcons = {
    New: faCircle,
    Active: faBolt,
    Resolved: faCircleCheck,
    Closed: faCircleXmark,
  };

  const statusColors = {
    New: "#A3A3A3",
    Active: "#E81E1E",
    Resolved: "#FAA434",
    Closed: "#13A115"
  };


  //  const totalWorkHours = useMemo(() => {
 
  //   if (
  //     !taskDate ||
  //     !taskTimeDetails.startTime ||
  //     !taskTimeDetails.endTime 
      
  //   ) return "";
 
  //   const start = new Date(
  //     `${taskDate}T${taskTimeDetails.startTime}`
  //   );
 
  //   const end = new Date(
  //     `${taskDate}T${taskTimeDetails.endTime}`
  //   );
 
  //   const diff = end - start;
 
  //   if (diff <= 0) return "";
 
  //   const hours = Math.floor(diff / (1000 * 60 * 60));
  //   const minutes = Math.floor((diff / (1000 * 60)) % 60);
 
  //   return `${hours}h ${minutes}m`;
 
  // }, [taskTimeDetails, taskDate]);

  const formatTime = (time) => {
  if (!time) return "";

  const [hours, minutes] = time.split(":");
  let h = parseInt(hours, 10);
  const ampm = h >= 12 ? "PM" : "AM";

  h = h % 12;
  h = h ? h : 12; // 0 becomes 12

  return `${h}:${minutes} ${ampm}`;
};

const getDuration = (start, end) => {
  const startTime = new Date(`1970-01-01T${start}`);
  const endTime = new Date(`1970-01-01T${end}`);

  const diffMs = endTime - startTime;

  const hours = Math.floor(diffMs / (1000 * 60 * 60));
  const minutes = Math.floor((diffMs / (1000 * 60)) % 60);

  return `${hours}h ${minutes}m`;
};
  return (
<>
  

{taskOpen && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">

    <div className="bg-white w-[90vw] h-[80vh] rounded-lg shadow-xl flex flex-col scroll-my-1 mt-10">

      <div
        className="flex flex-col border-b p-4"
        style={{
          borderLeft: `6px solid ${statusColors[task.status] || "#ccc"}`,
          borderTopLeftRadius: "8px",
          gap: "20px"
        }}
      > 

        <div style={{display:"flex",justifyContent:"space-between"}}>
<h2 className="text-lg font-semibold">
  {String(task.id).slice(-3)} {task.workItemType}
</h2>
          <button
            onClick={() => setTaskOpen(false)}
            className="text-gray-500 hover:text-black text-xl"
          >
            ✕
          </button>
        </div>

        <Input
          value={editData.title}
          onChange={(e)=> setEditData({ ...editData, title:e.target.value })}
        />

        <div style={{display:"flex",justifyContent:"space-between"}}>

          <div style={{display:"flex",alignItems:"center",gap:"8px"}}>

            <Select
              value={editData.assignee}
              onValueChange={(value)=> setEditData({ ...editData, assignee:value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Assign To" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="Eshanth">Eshanth</SelectItem>
                <SelectItem value="Ajith">Ajith</SelectItem>
                <SelectItem value="Nikhil">Nikhil</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={editData.status}
              onValueChange={(value)=> setEditData({ ...editData, status:value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="New">New</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Resolved">Resolved</SelectItem>
                <SelectItem value="Closed">Closed</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={editData.sprint}
              onValueChange={(value)=> setEditData({ ...editData, sprint:value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Sprint" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="Sprint 1">Sprint 1</SelectItem>
                <SelectItem value="Sprint 2">Sprint 2</SelectItem>
                <SelectItem value="Sprint 3">Sprint 3</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={editData.workItemType}
              onValueChange={(value)=> setEditData({ ...editData, workItemType:value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Work Type" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="Bug">Bug</SelectItem>
                <SelectItem value="UserStory">User story</SelectItem>
                <SelectItem value="Feature">Feature</SelectItem>
                <SelectItem value="Epic">Epic</SelectItem>
              </SelectContent>
            </Select>

          </div>

          
        </div>
      </div>



<div className="grid gap-4 p-4 flex-1 overflow-y-auto">

<div style={{display:"flex",gap:"40px",marginLeft:"10px"}}>

<div style={{width:"60%",display:"flex",flexDirection:"column",gap:"20px"}}>

<p className="text-sm font-medium">Description</p>

<Textarea
rows={6}
value={editData.description}
onChange={(e)=> setEditData({...editData,description:e.target.value})}
/>

<div className="flex flex-col gap-4">

  <Input
    placeholder="Write comment..."
    value={newComment}
    onChange={(e)=> setNewComment(e.target.value)}
    style={{ padding: "35px" }}
  />

  <div style={{ display: "flex", justifyContent: "flex-end" }}>
    <Button size="sm" onClick={addComment}>
      Add Comment
    </Button>
  </div>

  <h3 className="font-semibold mb-2">Comments</h3>

  {Array.isArray(comments) && comments.length > 0 ? (

    <div className="space-y-2">
      {comments.map((c, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: "10px" }}>

          <p
            className="flex items-center justify-center text-xs font-semibold"
            style={{
              width: "28px",
              height: "28px",
              borderRadius: "50%",
              backgroundColor: "#e5e7eb"
            }}
          >
            {c.author?.[0]?.toUpperCase()}
          </p>

          <div className="bg-gray-100 p-2 rounded" style={{ width: "100%" }}>
            <p className="text-sm">{c.text}</p>
            <p className="text-[10px] text-gray-500">{c.date}</p>
          </div>

        </div>
      ))}
    </div>

  ) : (
    <p className="text-gray-400 text-sm">No comments yet</p>
  )}

</div>
</div>

<hr style={{border: "0.4px solid #F5F5F5", height:"auto"}}/>

<div className="flex-1 overflow-y-auto" style={{marginTop: "2px"}}>
  <div style={{display:"flex", flexDirection: "column", marginBottom: "5px"}}>
    <label htmlFor="" className="text-sm font-medium" style={{ fontWeight: "500", marginBottom: "5px"}}>Effort (Hours)</label>
    <hr/>
    <label htmlFor="" style={{color: "", fontSize: "13px", marginTop:"5px"}}>Original Estimate</label>
    <input type="text" style={{marginTop: "5px", border:"1px solid #D1D1D1 ", borderRadius: "4px", paddingLeft: "8px", fontSize: "15px", }} value={estimatedHours} onChange={(e)=> setEstimatedHours(e.target.value)} />
  </div>



<div style={{ marginTop: "5px" }}>
<label style={{fontSize:"13px"}}>Completed</label>

<div style={{display:"flex",flexDirection: "column ",gap:"5px",marginTop:"1px", fontSize: "14px"}}>

<input
type="date"
value={logInput.date}
onChange={(e)=>
setLogInput(prev=>({...prev,date:e.target.value}))
}
style={{  border:"1px solid #D1D1D1 ", borderRadius: "4px", paddingLeft: "6px", fontSize: "15px",}}
/>

<div style={{display: "flex", gap: "10px", marginTop:"5px",  alignItems: "center", marginLeft: "2px"}}>

<div>
<label htmlFor="">Start Time </label>
<input
type="time"
value={logInput.startTime}
onChange={(e)=>
setLogInput(prev=>({...prev,startTime:e.target.value}))

}

/>
</div>

<div >
<label htmlFor="">End Time </label>
<input
type="time"
value={logInput.endTime}
onChange={(e)=>
setLogInput(prev=>({...prev,endTime:e.target.value}))
}
/>
</div>

<Button size="sm" onClick={addWorkLog} style={{width: "20%"}}>
Add
</Button>

</div>




</div>
</div>

<div style={{marginTop:"15px"}}>

{workLogs.length === 0 ? (
<p style={{fontSize:"13px",color:"gray"}}></p>
) : (
  

workLogs.map((log)=>(
<div
key={log.id}
style={{
padding:"8px",
border:"1px solid #E5E5E5",
borderRadius:"8px",
marginBottom:"8px"
}}
>

<div style={{display:"flex",justifyContent:"space-between", alignItems: "center"}}>

<div>
<p style={{fontWeight:"500", fontSize: "14px"}}>{log.date}</p>
<p style={{fontSize:"11px",color:"gray"}}>
{formatTime(log.startTime)} → {formatTime(log.endTime)}
</p>
</div>
<p style={{ color: "blue", fontSize: "13px" }}>
  {getDuration(log.startTime, log.endTime)}
</p>
</div>

</div>
))

)}

</div>




 <p style={{color: "blue", fontSize: "14px", marginTop: "10px", textAlign: "center"}}> Total work hours : {totalWorkHours}</p> 


</div>
</div>
</div>



<div className="flex justify-end gap-2 border-t p-4">

<Button variant="outline" onClick={()=> setTaskOpen(false)}>
Cancel
</Button>

<Button
onClick={()=>{
handleSave();
setTaskOpen(false);
}}
>
Save and Close
</Button>

</div>

</div>
</div>
)}



<div className="bg-white p-4 rounded-xl shadow-md" style={{border: "1px solid #D6D6D6", width: "100%"}}>

<div style={{display:"flex",justifyContent:"space-between",alignItems:"start"}}>



{isEditing ? (

<Input
autoFocus
value={editData.title}
onChange={(e)=> setEditData({...editData,title:e.target.value})}
onBlur={handleSave}
onKeyDown={(e)=>{
if(e.key==="Enter"){
handleSave();
}
}}
className="h-7 text-sm"
/>

) : (

<h3
className="font-semibold cursor-pointer"
style={{fontSize:"13px"}}
onClick={()=> setTaskOpen(true)}
>
{task.title}
</h3>

)}



<DropdownMenu>

<DropdownMenuTrigger asChild>
<button className="p-1 hover:bg-gray-100 rounded">
<BsThreeDots/>
</button>
</DropdownMenuTrigger>

<DropdownMenuContent align="end">

<DropdownMenuItem onClick={()=> setTaskOpen(true)}>
Open
</DropdownMenuItem>

<DropdownMenuItem onClick={()=> setIsEditing(true)}>
Edit Title
</DropdownMenuItem>

<DropdownMenuSub>

<DropdownMenuSubTrigger>
Move to Iteration
</DropdownMenuSubTrigger>

<DropdownMenuSubContent>

<DropdownMenuItem
onClick={()=> setEditData({...editData,sprint:"Sprint 1"})}
>
Sprint 1
</DropdownMenuItem>

<DropdownMenuItem
onClick={()=> setEditData({...editData,sprint:"Sprint 2"})}
>
Sprint 2
</DropdownMenuItem>

<DropdownMenuItem
onClick={()=> setEditData({...editData,sprint:"Sprint 3"})}
>
Sprint 3
</DropdownMenuItem>

</DropdownMenuSubContent>

</DropdownMenuSub>

<DropdownMenuItem>
Add Subtask
</DropdownMenuItem>

</DropdownMenuContent>

</DropdownMenu>

</div>



<span
className="text-xs font-medium px-2 py-1 rounded flex items-center gap-1"
style={{
fontSize:"10px",
width:"fit-content",
marginTop:"5px",
backgroundColor:statusColors[task.status] || "#e5e7eb",
color:"white"
}}
>
<FontAwesomeIcon icon={statusIcons[task.status] || faCircle}/>
{task.status}
</span>

<div style={{display:"flex",flexDirection:"column",gap:"2px",marginTop:"10px"}}>

<p className="text-gray-500 flex items-center gap-2" style={{fontSize:"12px"}}>
<FontAwesomeIcon icon={faUser} className="text-gray-400"/>
{task.assignee}
</p>

<p className="text-gray-500 flex items-center gap-2" style={{fontSize:"12px"}}>
<FontAwesomeIcon
icon={workTypeIcons[task.workItemType] || faTag}
className="text-blue-500"
/>
{task.workItemType}
</p>

<p className="text-gray-500 flex items-center gap-2" style={{fontSize:"12px"}}>
<FontAwesomeIcon icon={faRocket} className="text-purple-500"/>
{task.sprint}
</p>

</div>

</div>

</>
);
}

