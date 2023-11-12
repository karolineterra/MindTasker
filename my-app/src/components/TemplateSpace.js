import React, { useState } from "react";
import TemplateBlock from "./TemplateBlock";
import "../styles/TemplatesSpace.css";
import EmptyBlock from "./EmptyBlock";

function TemplateSpace() {
    const [selectedTemplates, setSelectedTemplates] = useState({});

  const handleTemplateSelection = (templateComponent, blockId) => {
    setSelectedTemplates((prevSelected) => ({
      ...prevSelected,
      [blockId]: templateComponent,
    }));
  };

  return (
    <div className="templatesContainer">
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
      <TemplateBlock
        Component={selectedTemplates[4] || EmptyBlock}
        onTemplateSelect={(templateComponent) =>
          handleTemplateSelection(templateComponent, 4)
        }
      />
    </div>
  );
}

export default TemplateSpace;