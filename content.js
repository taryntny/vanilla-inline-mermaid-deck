// content.js
const MCPDIRECT_STUDIO_UX_STRATEGY_20251209 = {
  slide1: {
    badge: "Product Strategy Update",
    title1: "MCPDirect Studio",
    title2: "Redesigned Screen Flows",
    description:
      "Redesign UX overhaul covering Onboarding, MCP Configuration, Connect to Agent Client.",
    goal: "🎯 Goal: MVP Launch",
    scope:
      "⚡ Scope: onboarding, configuration, connect, toolpack, vMCP, instances",
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
  slide4: {
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
    },
    screen2: {
      header: "2. Client Setup",
      description: 'Connect the "Head".',
      step1Label: "1. Configure Agent Client:",
      installCommand: "Open Cursor Settings → MCP → Add Connection",
      step2Label: "2. Generate Studio Key:",
      keyPlaceholder: "sk-mcp-8x9s... [Copy]",
      button: "I've Generated It",
    },
    screen3: {
      header: "3. Connect Server",
      description: 'Flow D: Add "Body".',
      tab1: "Paste URL",
      tab2: "Presets",
      urlPlaceholder: "https://api.weather.com/sse",
      detected: "Detected: 4 Tools",
      button: "Connect & Scan",
    },
  },
  slide5: {
    badge: "Phase 1 (Cont.)",
    header: "Toolpack & Rules",
    description: "Flow E (Toolpack Shared Config) → Success",
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
  slide6: {
    badge: "Phase 2",
    header: "Developer Power Flows",
    description: "Flow F (vMCP Setup) → Flow G (Advanced Toggles)",
    screen6: {
      header: "6. Create vMCP",
      description: "Spin up local servers instantly.",
      title: "Select Template",
      template1Name: "John",
      template1Desc: "Toolpack",
      template2Name: "OpenAPI",
      template2Desc: "vMCP",
      location: "Location: localhost:8080",
      button: "Deploy Local",
    },
    screen7: {
      header: "7. Advanced Features",
      description: "Progressive disclosure of power.",
      title: "Experimental Features",
      feature1: "Multi-Instance Switching",
      feature2: "Team Management",
      feature3: "vMCP",
    },
    screen8: {
      header: "8. Tool Definition",
      description: "Including tool use permissions and preferences.",
      serverName: "Server: Weather_v1",
      toolJson:
        '{<br>&nbsp;"name": "get_forecast",<br>&nbsp;"args": ["lat", "long"]<br>}',
      resetButton: "Reset",
      saveButton: "Save overrides",
    },
  },
  slide7: {
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
  slide8: {
    header: "Execution Plan",
    column1: {
      header: "Immediate Priorities (Sprint 1-2)",
      item1: "Implement Flows A, B, C (Core Onboarding).",
      item2: 'Build "Copy Rules" logic in Toolpack UI.',
      item3: "Finalize templates (aka Toolpack)",
    },
    column2: {
      header: "Future Roadmap (Sprint 3+)",
      item1: "Team Permissions (RBAC).",
      item2: "Stripe Integration for Top-up.",
      item3: "OpenAPI to MCP Tools.",
    },
  },
  slide9: {
    badge: "MCPify & Deploy",
    header: "OpenAPI to MCP Tools",
    description:
      "Transform any OpenAPI endpoint into secure MCP tools with MCPDirect Gateway. Works with services hosted within MCPDirect ecosystem or external APIs—deploy instantly with one-click setup.",
    diagram: `graph LR
                subgraph Clients ["Clients"]
                    Agent["Agent<br/>(AI Assistant)"]
                    MCPClient["MCP Client<br/>(Cursor / AI Assistant)"]
                end
                
                subgraph Gateway ["MCPDirect Gateway"]
                    GatewayCore["Gateway Core<br/>• OpenAPI Parser<br/>• MCP Transformer<br/>• Tool Registry"]
                    Identity["Identity Service<br/>• Token Vault<br/>• OAuth2 Auth<br/>• Credentials Provider"]
                end
                
                subgraph Services ["Services"]
                    MCPTool1["vMCP Service 1<br/>(Internal API)"]
                    MCPTool2["vMCP Service 2<br/>(Studio Deployed)"]
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
