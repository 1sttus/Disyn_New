"use client";

import { useState, useEffect } from "react";
import { Users, Eye, BarChart, CheckCircle2, Trash2, Edit3, MessageSquare } from "lucide-react";

interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  packageName: string;
  status: string;
  notes: string | null;
  createdAt: string;
}

interface Analytics {
  visits: number;
  clicks: number;
  conversions: number;
  conversionRate: string;
}

export default function DashboardOverview() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [analytics, setAnalytics] = useState<Analytics>({
    visits: 0,
    clicks: 0,
    conversions: 0,
    conversionRate: "0.0%",
  });
  const [loading, setLoading] = useState(true);

  // Note editing state
  const [editingLeadId, setEditingLeadId] = useState<string | null>(null);
  const [editingNotes, setEditingNotes] = useState("");

  const loadData = async () => {
    setLoading(true);
    try {
      // Load Leads
      const leadsRes = await fetch("/api/admin/leads");
      if (leadsRes.ok) {
        const leadsData = await leadsRes.json();
        setLeads(leadsData);
      }

      // Load Analytics
      const analyticsRes = await fetch("/api/analytics");
      if (analyticsRes.ok) {
        const analyticsData = await analyticsRes.json();
        setAnalytics(analyticsData);
      }
    } catch (e) {
      console.error("Failed to load dashboard data:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const res = await fetch("/api/admin/leads", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });

      if (res.ok) {
        setLeads(leads.map((l) => (l.id === id ? { ...l, status: newStatus } : l)));
        loadData(); // Reload analytics
      } else {
        alert("Failed to update status");
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleNotesSave = async (id: string) => {
    try {
      const res = await fetch("/api/admin/leads", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, notes: editingNotes }),
      });

      if (res.ok) {
        setLeads(leads.map((l) => (l.id === id ? { ...l, notes: editingNotes } : l)));
        setEditingLeadId(null);
      } else {
        alert("Failed to save notes");
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteLead = async (id: string) => {
    if (!confirm("Are you sure you want to delete this lead? This action is permanent.")) return;

    try {
      const res = await fetch(`/api/admin/leads?id=${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setLeads(leads.filter((l) => l.id !== id));
      } else {
        alert("Failed to delete lead");
      }
    } catch (e) {
      console.error(e);
    }
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "new":
        return "bg-accent-cyan/10 text-accent-cyan border border-accent-cyan/20";
      case "contacted":
        return "bg-accent-purple/10 text-accent-purple border border-accent-purple/20";
      case "closed":
        return "bg-accent-green/10 text-accent-green border border-accent-green/20";
      default:
        return "bg-gray-500/10 text-gray-500 border border-gray-500/20";
    }
  };

  return (
    <div className="space-y-8">
      {/* Title */}
      <div>
        <h1 className="text-3xl font-black font-space text-white tracking-wide">
          CRM LEADS & ANALYTICS OVERVIEW
        </h1>
        <p className="text-sm text-text-secondary">
          Track conversion activity, package selections, and customer follow-up actions.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { name: "Total Visits", value: analytics.visits, icon: Eye, color: "text-accent-cyan", bg: "bg-accent-cyan/5", border: "border-accent-cyan/15" },
          { name: "Package Clicks", value: analytics.clicks, icon: BarChart, color: "text-accent-purple", bg: "bg-accent-purple/5", border: "border-accent-purple/15" },
          { name: "CRM Leads", value: analytics.conversions, icon: Users, color: "text-accent-green", bg: "bg-accent-green/5", border: "border-accent-green/15" },
          { name: "Conversion Rate", value: analytics.conversionRate, icon: CheckCircle2, color: "text-accent-warning", bg: "bg-accent-warning/5", border: "border-accent-warning/15" },
        ].map((stat, idx) => (
          <div key={idx} className={`card-standard p-6 border bg-[#0D111F]/50 ${stat.border}`}>
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-text-muted uppercase tracking-widest font-space">
                {stat.name}
              </span>
              <div className={`p-2.5 rounded-lg ${stat.bg} ${stat.color}`}>
                <stat.icon className="w-5 h-5" />
              </div>
            </div>
            <p className="text-3xl font-black font-space text-white mt-4 tracking-tight">
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Leads Table Container */}
      <div className="card-standard border-white/5 bg-[#0D111F]/50 overflow-hidden">
        <div className="p-6 border-b border-white/5 flex items-center justify-between">
          <h3 className="text-lg font-bold font-space text-white uppercase tracking-wider">
            Recent Leads Log ({leads.length})
          </h3>
          <button
            onClick={loadData}
            className="text-xs font-bold text-accent-cyan hover:text-white transition-colors cursor-pointer"
          >
            Refresh Logs
          </button>
        </div>

        {loading ? (
          <div className="text-center py-20 text-text-disabled text-sm font-semibold uppercase tracking-widest font-mono">
            Refreshing lead logs...
          </div>
        ) : leads.length === 0 ? (
          <div className="text-center py-20 text-text-disabled">No leads registered.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/5 text-[10px] font-black uppercase text-text-muted tracking-wider font-space">
                  <th className="p-6">Client Info</th>
                  <th className="p-6">Package Selected</th>
                  <th className="p-6">Submission Date</th>
                  <th className="p-6">Pipeline Status</th>
                  <th className="p-6">Administrative Notes</th>
                  <th className="p-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-sm text-text-secondary">
                {leads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-white/[0.01] transition-colors">
                    {/* Client Info */}
                    <td className="p-6">
                      <div className="font-bold text-white">{lead.name}</div>
                      <div className="text-xs text-text-muted mt-0.5">{lead.email || "No Email Provided"}</div>
                      <a
                        href={`https://wa.me/${lead.phone.replace(/[+\s-]/g, "")}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-xs text-accent-green hover:underline mt-1.5 font-semibold"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        {lead.phone}
                      </a>
                    </td>

                    {/* Package */}
                    <td className="p-6">
                      <span className="font-semibold text-white bg-white/5 px-2.5 py-1 rounded-md text-xs border border-white/10">
                        {lead.packageName}
                      </span>
                    </td>

                    {/* Date */}
                    <td className="p-6 text-xs text-text-disabled font-medium">
                      {new Date(lead.createdAt).toLocaleDateString(undefined, {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>

                    {/* Status Dropdown */}
                    <td className="p-6">
                      <select
                        value={lead.status}
                        onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                        className={`text-xs font-bold rounded-full px-3 py-1 cursor-pointer outline-none transition-all ${getStatusBadgeClass(
                          lead.status
                        )}`}
                      >
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="closed">Closed</option>
                      </select>
                    </td>

                    {/* Administrative Notes */}
                    <td className="p-6 max-w-xs">
                      {editingLeadId === lead.id ? (
                        <div className="flex gap-2 items-center">
                          <input
                            type="text"
                            value={editingNotes}
                            onChange={(e) => setEditingNotes(e.target.value)}
                            className="bg-[#121624] border border-white/10 rounded px-2 py-1 text-xs text-white outline-none w-full"
                          />
                          <button
                            onClick={() => handleNotesSave(lead.id)}
                            className="text-xs bg-accent-cyan text-primary-bg px-2 py-1 rounded font-bold cursor-pointer"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => setEditingLeadId(null)}
                            className="text-xs bg-white/5 text-text-disabled px-2 py-1 rounded cursor-pointer"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between gap-2 group">
                          <p className="text-xs text-text-muted italic truncate max-w-[200px]">
                            {lead.notes || "No notes recorded"}
                          </p>
                          <button
                            onClick={() => {
                              setEditingLeadId(lead.id);
                              setEditingNotes(lead.notes || "");
                            }}
                            className="p-1 rounded hover:bg-white/5 text-text-disabled hover:text-accent-cyan opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                            title="Edit Notes"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="p-6 text-right">
                      <button
                        onClick={() => handleDeleteLead(lead.id)}
                        className="p-2 rounded-lg hover:bg-red-500/10 text-text-disabled hover:text-accent-danger transition-colors cursor-pointer"
                        title="Delete Lead"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
