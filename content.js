// content.js
const MCPDIRECT_STUDIO_UX_STRATEGY_20251209 = {
  slide1: {
    badge: "Product Strategy Update",
    title1: "MCPDirect Studio",
    title2: "Redesigned Screen Flows",
    description:
      "A complete UX overhaul covering Onboarding, vMCP Configuration, Governance, and Scaling.",
    goal: "🎯 Goal: MVP Launch",
    scope: "⚡ Scope: Flows A - I",
  },
  slide2: {
    header: "The Core Mental Model",
    description:
      "Before diving into screens, we must reinforce this hierarchy in the UI.",
    diagram: `graph LR
                User(("User"))
                
                subgraph StudioHub ["MCPDirect Studio (The Hub)"]
                    Studio["Studio Core"]
                    Toolpacks["Toolpacks<br>(Shared Configs)"]
                    Teams["Teams<br>(Access Control)"]
                    Keys["Keys<br>(API Keys)"]
                    Instances["Instances<br>(Local/Cloud)"]
                end
                
                subgraph External ["External World"]
                    ServerA["MCP Server A<br>(Weather)"]
                    ServerB["vMCP Server<br>(Local Dev)"]
                    Client["Agent Client<br>(Cursor / Claude)"]
                end

                User -->|1. Selects Role| Studio
                Studio -->|2. Connects via 1 Key| Client
                Studio -->|3. Manages| Toolpacks
                Studio -->|4. Manages| Teams
                Studio -->|5. Manages| Keys
                Studio -->|6. Manages| Instances
                Toolpacks -.->|Aggregates| ServerA
                Toolpacks -.->|Aggregates| ServerB
                
                style Studio fill:#0f172a,stroke:#38bdf8,stroke-width:4px
                style Toolpacks fill:#1e293b,stroke:#94a3b8,stroke-width:2px
                style Teams fill:#1e293b,stroke:#94a3b8,stroke-width:2px
                style Keys fill:#1e293b,stroke:#94a3b8,stroke-width:2px
                style Instances fill:#1e293b,stroke:#94a3b8,stroke-width:2px
                style Client fill:#065f46,stroke:#34d399,stroke-width:2px`,
  },
  slide3: {
    badge: "Phase 1",
    header: "Onboarding & Initial Connection",
    description: "Flow A (Entry) → Flow B (Role) → Flow C (Client Setup)",
    screen1: {
      header: "1. Role Selection",
      description: "Set the stage.",
      prompt: "I am a...",
      role1: "Developer (Code)",
      role2: "Founder (Overview)",
      role3: "Platform Eng (Admin)",
      preloads: "Pre-loads: Cursor + Git Tools",
      button: "Next",
      systemResponse: "> LOAD: Starter_Pack_Dev<br>> PREPARE: Client_Guide",
    },
    screen2: {
      header: "2. Client Setup",
      description: 'Connect the "Head".',
      step1Label: "1. Install Client:",
      installCommand: "npx mcp-client init",
      step2Label: "2. Paste Studio Key:",
      keyPlaceholder: "sk-mcp-8x9s... [Copy]",
      button: "I've Pasted It",
      systemResponse: "> WAIT_FOR: Heartbeat<br>> VALIDATE: Handshake",
    },
    screen3: {
      header: "3. Connect Server",
      description: 'Flow D: Add "Body".',
      tab1: "Paste URL",
      tab2: "Presets",
      urlPlaceholder: "https://api.weather.com/sse",
      detected: "Detected: 4 Tools",
      button: "Connect & Scan",
      systemResponse: "> FETCH: Metadata<br>> PARSE: Tool_Definitions",
    },
  },
  slide4: {
    badge: "Phase 1 (Cont.)",
    header: "Toolpack & Rules",
    description: "Flow E (Toolpack Config) → Success",
    screen4: {
      header: "4. Toolpack Definition",
      description: "Refine tools and Get Rules.",
      activeToolpack: "Active Toolpack: Dev_Starter",
      tool1: "Context7 (Search)",
      tool2: "GitHub (Read)",
      tool3: "Slack (Write)",
      rulesFile: "system_prompt.md",
      copyRulesButton: "Copy Rules",
      finishButton: "Finish Setup",
      systemResponse: "> GENERATE: Agent_Rules<br>> CLIPBOARD: Copy_Action",
    },
    screen5: {
      header: "5. All Set",
      description: "Ready to Code.",
      status: "Connection Active",
      clientStatus: "Client: Cursor Connected",
      serversStatus: "Servers: 2 Online",
      button: "Open Studio Dashboard",
    },
  },
  slide5: {
    badge: "Phase 2",
    header: "Developer Power Flows",
    description: "Flow F (vMCP Setup) → Flow G (Advanced Toggles)",
    screen6: {
      header: "6. Create vMCP",
      description: "Spin up local servers instantly.",
      title: "Select Template",
      template1Name: "SQLite",
      template1Desc: "Local DB",
      template2Name: "OpenAPI",
      template2Desc: "Stub",
      location: "Location: localhost:8080",
      button: "Deploy Local",
      systemResponse: "> DOCKER: Run_Container<br>> EXPOSE: SSE_Stream",
    },
    screen7: {
      header: "7. Advanced Features",
      description: "Progressive disclosure of power.",
      title: "Experimental Features",
      feature1: "Multi-Server Switching",
      feature2: "Team Management",
      feature3: "Cloud Instances",
      systemResponse: "> UPDATE: User_Prefs<br>> UI: Reveal_Hidden_Tabs",
    },
    screen8: {
      header: "8. Tool Definition",
      description: "Manually overriding server capabilities.",
      serverName: "Server: Weather_v1",
      toolJson:
        '{<br>&nbsp;"name": "get_forecast",<br>&nbsp;"args": ["lat", "long"]<br>}',
      resetButton: "Reset",
      saveButton: "Save overrides",
    },
  },
  slide6: {
    badge: "Phase 3",
    header: "Governance, Instances & Commercial",
    description: "Flow H (Teams) → Flow I (Instances) → Top-up",
    screen9: {
      header: "9. Team Access",
      description: "Manage Toolpack visibility.",
      projectName: "Project Alpha",
      inviteButton: "+ Invite",
      user1Email: "alice@corp.com",
      user1Role: "Admin",
      user2Email: "bob@corp.com",
      user2Role: "Viewer",
      saveButton: "Save Permissions",
    },
    screen10: {
      header: "10. Instances",
      description: "Local vs Cloud Bridges.",
      instance1Name: "This Mac",
      instance1Location: "Localhost",
      instance2Name: "AWS Prod",
      instance2Location: "us-east-1",
      connectButton: "+ Connect Cloud Instance",
    },
    screen11: {
      header: "11. Usage & Top-up",
      description: "Paid tiers for heavy usage.",
      balanceLabel: "Current Balance",
      balanceAmount: "450",
      balanceUnit: "credits",
      usagePercent: "75% Used",
      topupButton: "Auto-Reload ($20)",
    },
  },
  slide7: {
    header: "Complete Lifecycle View",
    description: "How flows A through I fit together.",
    diagram: `graph TD
                subgraph Onboarding ["Phase 1: Onboarding"]
                    Start(["Entry"]) --> Role{"Role?"}
                    Role --> ClientSetup["Client Setup"]
                    ClientSetup --> ServerConnect["Connect Server"]
                    ServerConnect --> Toolpack["Toolpack & Rules"]
                end

                subgraph Operations ["Phase 2: Ops & Dev"]
                    Toolpack --> Dashboard["Main Dashboard"]
                    Dashboard --> vMCP["Create vMCP"]
                    Dashboard --> Adv["Adv. Toggles"]
                end

                subgraph Scale ["Phase 3: Scale"]
                    Adv --> Teams["Team Mgmt"]
                    Adv --> Instances["Instances"]
                    Dashboard --> TopUp["$$ Top-Up"]
                end
                
                style Start fill:#334155,stroke:#fff
                style TopUp fill:#065f46,stroke:#34d399,stroke-width:2px
                style Teams fill:#c2410c,stroke:#fdba74`,
  },
  slide8: {
    header: "Execution Plan",
    column1: {
      header: "Immediate Priorities (Sprint 1-2)",
      item1: "Implement Flows A, B, C (Core Onboarding).",
      item2: 'Build "Copy Rules" logic in Toolpack UI.',
      item3: "Finalize vMCP Docker templates.",
    },
    column2: {
      header: "Future Roadmap (Sprint 3+)",
      item1: "Team Permissions (RBAC).",
      item2: "Stripe Integration for Top-up.",
      item3: "Cloud Instance tunneling.",
    },
  },
  slide9: {
    badge: "MCPify & Deploy",
    header: "MCPify Your OpenAPI RESTful APIs",
    description:
      "Transform any OpenAPI endpoint into secure MCP tools with MCPDirect Gateway. Works with services hosted within MCPDirect ecosystem or external APIs—deploy instantly with one-click setup.",
    diagram: `graph LR
                subgraph Clients ["Clients"]
                    Agent["Agent<br/>(AI Assistant)"]
                    MCPClient["MCP Client<br/>(Cursor / Claude)"]
                end
                
                subgraph Gateway ["MCPDirect Gateway"]
                    GatewayCore["Gateway Core<br/>• OpenAPI Parser<br/>• MCP Transformer<br/>• Tool Registry"]
                    Identity["Identity Service<br/>• Token Vault<br/>• OAuth2 Auth<br/>• Credentials Provider"]
                end
                
                subgraph MCPHosted ["MCPDirect Hosted Services"]
                    MCPTool1["vMCP Service 1<br/>(Internal API)"]
                    MCPTool2["vMCP Service 2<br/>(Studio Deployed)"]
                end
                
                subgraph External ["External Services"]
                    ExtAPI1["External API 1<br/>(Weather API)"]
                    ExtAPI2["External API 2<br/>(GitHub API)"]
                    ExtAPI3["External API 3<br/>(Custom API)"]
                end
                
                subgraph Auth ["Identity Provider"]
                    IdP["OAuth Provider<br/>(Cognito / Okta / Auth0)"]
                end
                
                Agent -->|"/mcp<br/>List tools, Invoke"| GatewayCore
                MCPClient -->|"Streamable HTTP"| GatewayCore
                GatewayCore <-->|"Inbound Auth"| Identity
                GatewayCore -->|"Outbound API Key"| MCPTool1
                GatewayCore -->|"Outbound API Key"| MCPTool2
                GatewayCore -->|"Outbound API Key"| ExtAPI1
                GatewayCore -->|"Outbound API Key"| ExtAPI2
                GatewayCore -->|"Outbound API Key"| ExtAPI3
                Identity <-->|"OAuth2 Flow"| IdP
                Identity -.->|"Outbound Auth<br/>Resource Credentials"| GatewayCore
                
                style GatewayCore fill:#0f172a,stroke:#10b981,stroke-width:4px
                style Identity fill:#1e293b,stroke:#34d399,stroke-width:2px
                style MCPTool1 fill:#1e293b,stroke:#10b981,stroke-width:2px
                style MCPTool2 fill:#1e293b,stroke:#10b981,stroke-width:2px
                style ExtAPI1 fill:#1e293b,stroke:#94a3b8,stroke-width:2px
                style ExtAPI2 fill:#1e293b,stroke:#94a3b8,stroke-width:2px
                style ExtAPI3 fill:#1e293b,stroke:#94a3b8,stroke-width:2px
                style Agent fill:#065f46,stroke:#34d399,stroke-width:2px
                style MCPClient fill:#065f46,stroke:#34d399,stroke-width:2px`,
  },
};

// Make available globally for vanilla script usage
const DEFAULT_DECK_CONTENT = MCPDIRECT_STUDIO_UX_STRATEGY_20251209;

// Export if using modules
if (typeof module !== "undefined") module.exports = DEFAULT_DECK_CONTENT;

const updatedContentv1 = {
  slide1: {
    badge: "Product Strategy Update",
    title1: "MCPDirect Studio",
    title2: "Redesigned Screen Flows",
    description:
      "A complete UX overhaul covering Onboarding, vMCP Configuration, Governance, and Scaling.",
    goal: "🎯 Goal: MVP Launch",
    scope: "⚡ Scope: Flows A - I",
  },
  slide2: {
    header: "The Core Mental Model",
    description:
      "Before diving into screens, we must reinforce this hierarchy in the UI.",
    diagram:
      'graph LR\n                User(("User"))\n                \n                subgraph StudioHub ["MCPDirect Studio (The Hub)"]\n                    Studio["Studio Core"]\n                    Toolpacks["Toolpacks<br>(Shared Configs)"]\n                end\n                \n                subgraph External ["External World"]\n                    ServerA["MCP Server A<br>(Weather)"]\n                    ServerB["vMCP Server<br>(Local Dev)"]\n                    Client["Agent Client<br>(Cursor / Claude)"]\n                end\n\n                User -->|1. Selects Role| Studio\n                Studio -->|2. Connects via 1 Key| Client\n                Studio -->|3. Manages| Toolpacks\n                Toolpacks -.->|Aggregates| ServerA\n                Toolpacks -.->|Aggregates| ServerB\n                \n                style Studio fill:#0f172a,stroke:#38bdf8,stroke-width:4px\n                style Toolpacks fill:#1e293b,stroke:#94a3b8,stroke-width:2px\n                style Client fill:#065f46,stroke:#34d399,stroke-width:2px',
  },
  slide3: {
    badge: "Phase 1",
    header: "Onboarding &amp; Initial Connection",
    description: "Flow A (Entry) → Flow B (Role) → Flow C (Client Setup)",
    screen1: {
      header: "1. Role Selection",
      description: "Set the stage.",
      prompt: "I am a...",
      role1: "Developer (Code)",
      role2: "Founder (Overview)",
      role3: "Platform Eng (Admin)",
      preloads: "Pre-loads: Cursor + Git Tools",
      button: "Next",
      systemResponse:
        "&gt; LOAD: Starter_Pack_Dev<br>&gt; PREPARE: Client_Guide",
    },
    screen2: {
      header: "2. Client Setup",
      description: 'Connect the "Head".',
      step1Label: "1. Install Client:",
      installCommand: "npx mcp-client init",
      step2Label: "2. Paste Studio Key:",
      keyPlaceholder: "sk-mcp-8x9s... [Copy]",
      button: "I've Pasted It",
      systemResponse: "&gt; WAIT_FOR: Heartbeat<br>&gt; VALIDATE: Handshake",
    },
    screen3: {
      header: "3. Connect Server",
      description: 'Flow D: Add "Body".',
      tab1: "Paste URL",
      tab2: "Presets",
      urlPlaceholder: "https://api.weather.com/sse",
      detected: "Detected: 4 Tools",
      button: "Connect &amp; Scan",
      systemResponse: "&gt; FETCH: Metadata<br>&gt; PARSE: Tool_Definitions",
    },
  },
  slide4: {
    badge: "Phase 1 (Cont.)",
    header: "Toolpack &amp; Rules",
    description: "Flow E (Toolpack Config) → Success",
    screen4: {
      header: "4. Toolpack Definition",
      description: "Refine tools and Get Rules.",
      activeToolpack: "Active Toolpack: Dev_Starter",
      tool1: "Context7 (Search)",
      tool2: "GitHub (Read)",
      tool3: "Slack (Write)",
      rulesFile: "system_prompt.md",
      copyRulesButton: "Copy Rules",
      finishButton: "Finish Setup",
      systemResponse:
        "&gt; GENERATE: Agent_Rules<br>&gt; CLIPBOARD: Copy_Action",
    },
    screen5: {
      header: "5. All Set",
      description: "Ready to Code.",
      status: "Connection Active",
      clientStatus: "Client: Cursor Connected",
      serversStatus: "Servers: 2 Online",
      button: "Open Studio Dashboard",
    },
  },
  slide5: {
    badge: "Phase 2",
    header: "Developer Power Flows",
    description: "Flow F (vMCP Setup) → Flow G (Advanced Toggles)",
    screen6: {
      header: "6. Create vMCP",
      description: "Spin up local servers instantly.",
      title: "Select Template",
      template1Name: "SQLite",
      template1Desc: "Local DB",
      template2Name: "OpenAPI",
      template2Desc: "Stub",
      location: "Location: localhost:8080",
      button: "Deploy Local",
      systemResponse: "&gt; DOCKER: Run_Container<br>&gt; EXPOSE: SSE_Stream",
    },
    screen7: {
      header: "7. Advanced Features",
      description: "Progressive disclosure of power.",
      title: "Experimental Features",
      feature1: "Multi-Server Switching",
      feature2: "Team Management",
      feature3: "Cloud Instances",
      systemResponse: "&gt; UPDATE: User_Prefs<br>&gt; UI: Reveal_Hidden_Tabs",
    },
    screen8: {
      header: "8. Tool Definition",
      description: "Manually overriding server capabilities.",
      serverName: "Server: Weather_v1",
      toolJson:
        '{<br>&nbsp;"name": "get_forecast",<br>&nbsp;"args": ["lat", "long"]<br>}',
      resetButton: "Reset",
      saveButton: "Save overrides",
    },
  },
  slide6: {
    badge: "Phase 3",
    header: "Governance, Instances &amp; Commercial",
    description: "Flow H (Teams) → Flow I (Instances) → Top-up",
    screen9: {
      header: "9. Team Access",
      description: "Manage Toolpack visibility.",
      projectName: "Project Alpha",
      inviteButton: "+ Invite",
      user1Email: "alice@corp.com",
      user1Role: "Admin",
      user2Email: "bob@corp.com",
      user2Role: "Viewer",
      saveButton: "Save Permissions",
    },
    screen10: {
      header: "10. Instances",
      description: "Local vs Cloud Bridges.",
      instance1Name: "This Mac",
      instance1Location: "Localhost",
      instance2Name: "AWS Prod",
      instance2Location: "us-east-1",
      connectButton: "+ Connect Cloud Instance",
    },
    screen11: {
      header: "11. Usage &amp; Top-up",
      description: "Paid tiers for heavy usage.",
      balanceLabel: "Current Balance",
      balanceAmount: "450",
      balanceUnit: "credits",
      usagePercent: "75% Used",
      topupButton: "Auto-Reload ($20)",
    },
  },
  slide7: {
    header: "Complete Lifecycle View",
    description: "How flows A through I fit together.",
    diagram:
      'graph TD\n                subgraph Onboarding ["Phase 1: Onboarding"]\n                    Start(["Entry"]) --> Role{"Role?"}\n                    Role --> ClientSetup["Client Setup"]\n                    ClientSetup --> ServerConnect["Connect Server"]\n                    ServerConnect --> Toolpack["Toolpack & Rules"]\n                end\n\n                subgraph Operations ["Phase 2: Ops & Dev"]\n                    Toolpack --> Dashboard["Main Dashboard"]\n                    Dashboard --> vMCP["Create vMCP"]\n                    Dashboard --> Adv["Adv. Toggles"]\n                end\n\n                subgraph Scale ["Phase 3: Scale"]\n                    Adv --> Teams["Team Mgmt"]\n                    Adv --> Instances["Instances"]\n                    Dashboard --> TopUp["$$ Top-Up"]\n                end\n                \n                style Start fill:#334155,stroke:#fff\n                style TopUp fill:#065f46,stroke:#34d399,stroke-width:2px\n                style Teams fill:#c2410c,stroke:#fdba74',
  },
  slide8: {
    header: "Execution Plan",
    column1: {
      header: "Immediate Priorities (Sprint 1-2)",
      item1: "Implement Flows A, B, C (Core Onboarding).",
      item2: 'Build "Copy Rules" logic in Toolpack UI.',
      item3: "Finalize vMCP Docker templates.",
    },
    column2: {
      header: "Future Roadmap (Sprint 3+)",
      item1: "Team Permissions (RBAC).",
      item2: "Stripe Integration for Top-up.",
      item3: "Cloud Instance tunneling.",
    },
  },
  slide9: {
    badge: "MCPify &amp; Deploy",
    header: "MCPify Your OpenAPI RESTful APIs",
    description:
      "Transform any OpenAPI endpoint into secure MCP tools with MCPDirect Gateway. Deploy instantly with one-click setup.",
    diagram:
      'graph LR\n                subgraph Clients ["Clients"]\n                    Agent["Agent<br/>(AI Assistant)"]\n                    MCPClient["MCP Client<br/>(Cursor / Claude)"]\n                end\n                \n                subgraph Gateway ["MCPDirect Gateway"]\n                    GatewayCore["Gateway Core<br/>• OpenAPI Parser<br/>• MCP Transformer<br/>• Tool Registry"]\n                    Identity["Identity Service<br/>• Token Vault<br/>• OAuth2 Auth<br/>• Credentials Provider"]\n                end\n                \n                subgraph APIs ["OpenAPI Services (Hosted as vMCP/ External)"]\n                    OpenAPITarget["OpenAPI Target<br/>(RESTful API)"]\n                    Tool4["Tool 4<br/>(Weather API)"]\n                    Tool5["Tool 5<br/>(GitHub API)"]\n                    Tool6["Tool 6<br/>(Custom API)"]\n                end\n                \n                subgraph Auth ["Identity Provider"]\n                    IdP["OAuth Provider<br/>(Cognito / Okta / Auth0)"]\n                end\n                \n                Agent -->|"/mcp<br/>List tools, Invoke"| GatewayCore\n                MCPClient -->|"Streamable HTTP"| GatewayCore\n                GatewayCore <-->|"Inbound Auth"| Identity\n                GatewayCore -->|"Outbound API Key"| OpenAPITarget\n                OpenAPITarget --> Tool4\n                OpenAPITarget --> Tool5\n                OpenAPITarget --> Tool6\n                Identity <-->|"OAuth2 Flow"| IdP\n                Identity -.->|"Outbound Auth<br/>Resource Credentials"| GatewayCore\n                \n                style GatewayCore fill:#0f172a,stroke:#10b981,stroke-width:4px\n                style Identity fill:#1e293b,stroke:#34d399,stroke-width:2px\n                style OpenAPITarget fill:#1e293b,stroke:#94a3b8,stroke-width:2px\n                style Agent fill:#065f46,stroke:#34d399,stroke-width:2px\n                style MCPClient fill:#065f46,stroke:#34d399,stroke-width:2px',
  },
};
