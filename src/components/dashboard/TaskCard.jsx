import { useState } from "react";
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

export default function TaskCard({ task, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(task);

  const handleSave = () => {
    onEdit(editData);
    setIsEditing(false);
  };

  // Dynamic Work Type Icon
  const workTypeIcons = {
    Bug: faBug,
    Feature: faBolt,
    Task: faClipboardList,
    Issue: faTag,
    Epic: faTag,
    "User Story": faTag,
    "Test Case": faClipboardList,
  };

  // Status Icon
  const statusIcons = {
    New: faCircle,
    Active: faBolt,
    Resolved: faCircleCheck,
    Closed: faCircleXmark,
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-md  ">
      {!isEditing ? (
                <>
                  {/* Title */}
                  <h3 className="font-semibold " style={{fontSize: "14px"}}>{task.title}</h3>
        <div style={{display: "flex", gap: "5px" }}>
                  <p className=" text-gray-500 mt-2 flex items-center gap-2" style={{fontSize: "12px"}}>
                    <FontAwesomeIcon icon={faUser} className="text-gray-400" />
                    {task.assignee}
                  </p>

                  {/* Work Type */}
                  <p className="text-sm text-gray-500 flex items-center gap-2 mt-1" style={{fontSize: "12px"}}>
                    <FontAwesomeIcon
                      icon={workTypeIcons[task.workItemType] || faTag}
                      className="text-blue-500"
                    />
                    {task.workItemType}
                  </p>

                  {/* Sprint */}
                  <p className="text-sm text-gray-500 flex items-center gap-2 mt-1" style={{fontSize: "12px"}}>
                    <FontAwesomeIcon icon={faRocket} className="text-purple-500" />
                    {task.sprint}
                  </p>
                  </div>

                  {/* Status + Edit */}
                  <div className="flex justify-between items-center mt-4" >
                    <span className="text-xs font-medium bg-gray-200 px-2 py-1 rounded flex items-center gap-1" style={{fontSize: "10px"}}>
                      <FontAwesomeIcon
                        icon={statusIcons[task.status] || faCircle}
                        className="text-gray-500"
                      />
                      {task.status}
                    </span>

                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setIsEditing(true)}
                      style={{fontSize: "10px"}}
                    >
                      Edit
                    </Button>
                  </div>
                </>
      ) : (
        <div className="space-y-3">
          <Input
            value={editData.title}
            onChange={(e) =>
              setEditData({ ...editData, title: e.target.value })
            }
            placeholder="Title"
          />

          {/* Work Type */}
          <Select
            value={editData.workItemType}
            onValueChange={(value) =>
              setEditData({ ...editData, workItemType: value })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Work Type" />
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

          {/* Assignee */}
          <Select
            value={editData.assignee}
            onValueChange={(value) =>
              setEditData({ ...editData, assignee: value })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Assign To" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Eshanth">Eshanth</SelectItem>
              <SelectItem value="Ajith">Ajith</SelectItem>
              <SelectItem value="Nikhil">Nikhil</SelectItem>
              <SelectItem value="Anirudh">Anirudh</SelectItem>
              <SelectItem value="Swati">Swati</SelectItem>
            </SelectContent>
          </Select>

          {/* Sprint */}
          <Select
            value={editData.sprint}
            onValueChange={(value) =>
              setEditData({ ...editData, sprint: value })
            }
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

          {/* Status */}
          <Select
            value={editData.status}
            onValueChange={(value) =>
              setEditData({ ...editData, status: value })
            }
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

          <Textarea
            value={editData.description}
            onChange={(e) =>
              setEditData({ ...editData, description: e.target.value })
            }
            placeholder="Description"
          />

          <Textarea
            value={editData.comments}
            onChange={(e) =>
              setEditData({ ...editData, comments: e.target.value })
            }
            placeholder="Comments"
          />

          <div className="flex gap-2">
            <Button size="sm" onClick={handleSave}>
              Save
            </Button>

            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                setEditData(task);
                setIsEditing(false);
              }}
            >
              Cancel
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}