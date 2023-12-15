import React, { useEffect, useState } from "react";
import TemplateBlock from "./TemplateBlock";
import "../styles/TemplatesSpace.css";
import EmptyBlock from "./EmptyBlock";
import axios from "axios";
import Kanban from "./Kanban";
import Todo from "./Todo";
import Pomodoro from "./Pomodoro";
import Note from "./Note";

function TemplateSpace({ spaceId }) {
  const [selectedTemplates, setSelectedTemplates] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token && spaceId) {
      axios
        .get(`/api/templates/${spaceId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          const templates = response.data;
          const newTemplates = {};

          templates.forEach((template) => {
            console.log(template);
            switch (template.type) {
              case "kanban":
                newTemplates[template.espaco - 1] = Kanban;
                break;
              case "pomodoro":
                newTemplates[template.espaco - 1] = Pomodoro;
                break;
              case "todolist":
                newTemplates[template.espaco - 1] = Todo;
                break;
              case "notas":
                newTemplates[template.espaco - 1] = Note;
                break;
              default:
                break;
            }
          });

          setSelectedTemplates(newTemplates);
        })
        .catch((error) => {
          console.error("Error fetching templates:", error);
        });
    }
  }, [spaceId]);

  console.log(selectedTemplates);

  const handleTemplateSelection = (templateComponent, blockId) => {
    setSelectedTemplates((prevSelected) => ({
      ...prevSelected,
      [blockId]: templateComponent,
    }));

    const token = localStorage.getItem("token");

    if (token && spaceId) {
      const templateType = templateComponent.templateType;

      console.log("Selected template type:", templateType);

      if (!templateType) {
        console.error(
          "Template type is undefined. Check if templateType is set on the template component.",
          templateComponent
        );
        return;
      }

      axios
        .post(
          `/api/addTemplate/${spaceId}`,
          { type: templateType, espaco: blockId + 1 },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          console.log(response.data.message);
        })
        .catch((error) => {
          console.error(`Error adding ${templateType} template:`, error);
        });
    }
  };

  return (
    <div className="templatesContainer">
      <TemplateBlock
        Component={selectedTemplates[0] || EmptyBlock}
        onTemplateSelect={(templateComponent) =>
          handleTemplateSelection(templateComponent, 0)
        }
      />
      <TemplateBlock
        Component={selectedTemplates[1] || EmptyBlock}
        onTemplateSelect={(templateComponent) =>
          handleTemplateSelection(templateComponent, 1)
        }
      />
      <TemplateBlock
        Component={selectedTemplates[2] || EmptyBlock}
        onTemplateSelect={(templateComponent) =>
          handleTemplateSelection(templateComponent, 2)
        }
      />
      <TemplateBlock
        Component={selectedTemplates[3] || EmptyBlock}
        onTemplateSelect={(templateComponent) =>
          handleTemplateSelection(templateComponent, 3)
        }
      />
    </div>
  );
}

export default TemplateSpace;
