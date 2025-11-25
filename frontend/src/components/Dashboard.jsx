import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Plus, Search, Filter, Trash2, Edit, X, Users, Briefcase, CheckCircle, XCircle, Zap, MapPin, IndianRupee } from 'lucide-react';
import { ModeToggle } from "@/components/mode-toggle";
import { useNavigate } from 'react-router-dom';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Dashboard = () => {
  const navigate = useNavigate();
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [currentCandidate, setCurrentCandidate] = useState(null);
  
  // Filters
  const [filters, setFilters] = useState({
    search: '',
    role: 'all',
    status: 'all',
    location: 'all',
    skills: '',
    minExp: '',
    maxExp: '',
    minSal: '',
    maxSal: ''
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: '',
    skills: '',
    experience_years: 0,
    location: '',
    salary_min: 0,
    salary_max: 0,
    status: 'New'
  });

  useEffect(() => {
    fetchCandidates();
  }, []);

  const fetchCandidates = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API}/candidates`);
      setCandidates(response.data);
    } catch (error) {
      console.error("Error fetching candidates:", error);
      toast.error("Failed to fetch candidates");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        skills: typeof formData.skills === 'string' ? formData.skills.split(',').map(s => s.trim()) : formData.skills,
        experience_years: parseInt(formData.experience_years),
        salary_min: parseInt(formData.salary_min),
        salary_max: parseInt(formData.salary_max)
      };

      if (currentCandidate) {
        await axios.put(`${API}/candidates/${currentCandidate.id}`, payload);
        toast.success("Candidate updated successfully");
      } else {
        await axios.post(`${API}/candidates`, payload);
        toast.success("Candidate added successfully");
      }
      
      setIsAddOpen(false);
      setIsEditOpen(false);
      resetForm();
      fetchCandidates();
    } catch (error) {
      console.error("Error saving candidate:", error);
      toast.error("Failed to save candidate");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this candidate?")) {
      try {
        await axios.delete(`${API}/candidates/${id}`);
        toast.success("Candidate deleted");
        fetchCandidates();
      } catch (error) {
        console.error("Error deleting candidate:", error);
        toast.error("Failed to delete candidate");
      }
    }
  };

  const openEdit = (candidate) => {
    setCurrentCandidate(candidate);
    setFormData({
      ...candidate,
      skills: candidate.skills.join(', ')
    });
    setIsEditOpen(true);
  };

  const resetForm = () => {
    setCurrentCandidate(null);
    setFormData({
      name: '',
      email: '',
      phone: '',
      role: '',
      skills: '',
      experience_years: 0,
      location: '',
      salary_min: 0,
      salary_max: 0,
      status: 'New'
    });
  };

  // Filtering Logic
  const filteredCandidates = candidates.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(filters.search.toLowerCase()) || 
                          c.email.toLowerCase().includes(filters.search.toLowerCase());
    
    const matchesRole = filters.role === 'all' || c.role === filters.role;
    const matchesStatus = filters.status === 'all' || c.status === filters.status;
    const matchesLocation = filters.location === 'all' || c.location.includes(filters.location);
    
    const matchesSkills = filters.skills === '' || c.skills.some(s => s.toLowerCase().includes(filters.skills.toLowerCase()));

    const matchesExp = (!filters.minExp || c.experience_years >= parseInt(filters.minExp)) &&
                       (!filters.maxExp || c.experience_years <= parseInt(filters.maxExp));
                       
    const matchesSal = (!filters.minSal || c.salary_max >= parseInt(filters.minSal)) &&
                       (!filters.maxSal || c.salary_min <= parseInt(filters.maxSal));

    return matchesSearch && matchesRole && matchesStatus && matchesLocation && matchesSkills && matchesExp && matchesSal;
  });

  const uniqueRoles = [...new Set(candidates.map(c => c.role))];
  const uniqueLocations = [...new Set(candidates.map(c => c.location))];

  const getStatusColor = (status) => {
    switch(status) {
      case 'Hired': return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'Interviewing': return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      case 'Rejected': return 'bg-red-500/10 text-red-500 border-red-500/20';
      default: return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
    }
  };

  // Stats
  const stats = {
    total: candidates.length,
    hired: candidates.filter(c => c.status === 'Hired').length,
    interviewing: candidates.filter(c => c.status === 'Interviewing').length,
    rejected: candidates.filter(c => c.status === 'Rejected').length
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumSignificantDigits: 3
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
            <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
              <Zap className="h-5 w-5 text-primary-foreground" />
            </div>
            <div className="text-xl font-bold tracking-tighter">NEXUS<span className="text-primary">HIRE</span></div>
          </div>
          <div className="flex items-center gap-4">
            <ModeToggle />
            <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
              R
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6 space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Recruiter Dashboard</h1>
            <p className="text-muted-foreground">Manage your candidate pipeline efficiently.</p>
          </div>
          <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
            <DialogTrigger asChild>
              <Button onClick={resetForm} data-testid="add-candidate-btn" className="shadow-lg shadow-primary/20">
                <Plus className="mr-2 h-4 w-4" /> Add Candidate
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Add New Candidate</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Full Name</Label>
                    <Input name="name" value={formData.name} onChange={handleInputChange} required data-testid="input-name" />
                  </div>
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input name="email" type="email" value={formData.email} onChange={handleInputChange} required data-testid="input-email" />
                  </div>
                  <div className="space-y-2">
                    <Label>Phone</Label>
                    <Input name="phone" value={formData.phone} onChange={handleInputChange} required data-testid="input-phone" />
                  </div>
                  <div className="space-y-2">
                    <Label>Role</Label>
                    <Input name="role" value={formData.role} onChange={handleInputChange} required data-testid="input-role" />
                  </div>
                  <div className="col-span-2 space-y-2">
                    <Label>Skills (comma separated)</Label>
                    <Input name="skills" value={formData.skills} onChange={handleInputChange} placeholder="Python, React, Design..." data-testid="input-skills" />
                  </div>
                  <div className="space-y-2">
                    <Label>Experience (Years)</Label>
                    <Input name="experience_years" type="number" value={formData.experience_years} onChange={handleInputChange} required data-testid="input-exp" />
                  </div>
                  <div className="space-y-2">
                    <Label>Location</Label>
                    <Input name="location" value={formData.location} onChange={handleInputChange} required data-testid="input-location" />
                  </div>
                  <div className="space-y-2">
                    <Label>Min Salary (₹)</Label>
                    <Input name="salary_min" type="number" value={formData.salary_min} onChange={handleInputChange} required data-testid="input-salary-min" />
                  </div>
                  <div className="space-y-2">
                    <Label>Max Salary (₹)</Label>
                    <Input name="salary_max" type="number" value={formData.salary_max} onChange={handleInputChange} required data-testid="input-salary-max" />
                  </div>
                  <div className="space-y-2">
                    <Label>Status</Label>
                    <Select name="status" value={formData.status} onValueChange={(v) => handleSelectChange('status', v)}>
                      <SelectTrigger data-testid="select-status">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="New">New</SelectItem>
                        <SelectItem value="Interviewing">Interviewing</SelectItem>
                        <SelectItem value="Hired">Hired</SelectItem>
                        <SelectItem value="Rejected">Rejected</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" data-testid="submit-candidate-btn">Save Candidate</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Candidates</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Hired</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">{stats.hired}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Interviewing</CardTitle>
              <Briefcase className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-500">{stats.interviewing}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Rejected</CardTitle>
              <XCircle className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-500">{stats.rejected}</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters Section - Separated */}
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Bar */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search by name or email..." 
                className="pl-10 h-10"
                value={filters.search}
                onChange={(e) => setFilters({...filters, search: e.target.value})}
                data-testid="filter-search"
              />
            </div>
            
            {/* Primary Filters */}
            <Select value={filters.role} onValueChange={(v) => setFilters({...filters, role: v})}>
              <SelectTrigger className="w-[180px]" data-testid="filter-role">
                <SelectValue placeholder="Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                {uniqueRoles.map(r => <SelectItem key={r} value={r}>{r}</SelectItem>)}
              </SelectContent>
            </Select>

            <Select value={filters.status} onValueChange={(v) => setFilters({...filters, status: v})}>
              <SelectTrigger className="w-[180px]" data-testid="filter-status">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="New">New</SelectItem>
                <SelectItem value="Interviewing">Interviewing</SelectItem>
                <SelectItem value="Hired">Hired</SelectItem>
                <SelectItem value="Rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filters.location} onValueChange={(v) => setFilters({...filters, location: v})}>
              <SelectTrigger className="w-[180px]" data-testid="filter-location">
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                {uniqueLocations.map(l => <SelectItem key={l} value={l}>{l}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>

          {/* Secondary Filters Row */}
          <div className="flex flex-col md:flex-row gap-4 items-center bg-card p-4 rounded-lg border border-border">
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <Filter className="h-4 w-4" />
              <span>Refine:</span>
            </div>
            
            <div className="flex-1">
              <Input 
                placeholder="Filter by specific skill (e.g. React)..." 
                value={filters.skills}
                onChange={(e) => setFilters({...filters, skills: e.target.value})}
                className="h-9"
                data-testid="filter-skills"
              />
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground whitespace-nowrap">Exp (Yrs):</span>
              <Input 
                placeholder="Min" 
                type="number"
                className="w-20 h-9"
                value={filters.minExp}
                onChange={(e) => setFilters({...filters, minExp: e.target.value})}
              />
              <span className="text-muted-foreground">-</span>
              <Input 
                placeholder="Max" 
                type="number"
                className="w-20 h-9"
                value={filters.maxExp}
                onChange={(e) => setFilters({...filters, maxExp: e.target.value})}
              />
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground whitespace-nowrap">Salary (₹):</span>
              <Input 
                placeholder="Min" 
                type="number"
                className="w-24 h-9"
                value={filters.minSal}
                onChange={(e) => setFilters({...filters, minSal: e.target.value})}
              />
              <span className="text-muted-foreground">-</span>
              <Input 
                placeholder="Max" 
                type="number"
                className="w-24 h-9"
                value={filters.maxSal}
                onChange={(e) => setFilters({...filters, maxSal: e.target.value})}
              />
            </div>
          </div>
        </div>

        {/* Data Grid */}
        <div className="rounded-xl border border-border bg-card overflow-hidden shadow-sm">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead>Name</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Experience</TableHead>
                <TableHead>Skills</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Salary Exp.</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-10">Loading...</TableCell>
                </TableRow>
              ) : filteredCandidates.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-10">No candidates found.</TableCell>
                </TableRow>
              ) : (
                filteredCandidates.map((candidate) => (
                  <TableRow key={candidate.id} className="group hover:bg-muted/50 transition-colors" data-testid={`row-${candidate.id}`}>
                    <TableCell className="font-medium">
                      <div>{candidate.name}</div>
                      <div className="text-xs text-muted-foreground">{candidate.email}</div>
                    </TableCell>
                    <TableCell>{candidate.role}</TableCell>
                    <TableCell>{candidate.experience_years} years</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {candidate.skills.slice(0, 2).map((skill, i) => (
                          <Badge key={i} variant="secondary" className="text-xs font-normal">{skill}</Badge>
                        ))}
                        {candidate.skills.length > 2 && (
                          <Badge variant="outline" className="text-xs font-normal">+{candidate.skills.length - 2}</Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3 text-muted-foreground" />
                        {candidate.location}
                      </div>
                    </TableCell>
                    <TableCell>{formatCurrency(candidate.salary_min)} - {formatCurrency(candidate.salary_max)}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(candidate.status)} variant="outline">
                        {candidate.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button variant="ghost" size="icon" onClick={() => openEdit(candidate)} data-testid={`edit-${candidate.id}`}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" onClick={() => handleDelete(candidate.id)} data-testid={`delete-${candidate.id}`}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Candidate</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
             <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Full Name</Label>
                    <Input name="name" value={formData.name} onChange={handleInputChange} required />
                  </div>
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input name="email" type="email" value={formData.email} onChange={handleInputChange} required />
                  </div>
                  <div className="space-y-2">
                    <Label>Phone</Label>
                    <Input name="phone" value={formData.phone} onChange={handleInputChange} required />
                  </div>
                  <div className="space-y-2">
                    <Label>Role</Label>
                    <Input name="role" value={formData.role} onChange={handleInputChange} required />
                  </div>
                  <div className="col-span-2 space-y-2">
                    <Label>Skills (comma separated)</Label>
                    <Input name="skills" value={formData.skills} onChange={handleInputChange} />
                  </div>
                  <div className="space-y-2">
                    <Label>Experience (Years)</Label>
                    <Input name="experience_years" type="number" value={formData.experience_years} onChange={handleInputChange} required />
                  </div>
                  <div className="space-y-2">
                    <Label>Location</Label>
                    <Input name="location" value={formData.location} onChange={handleInputChange} required />
                  </div>
                  <div className="space-y-2">
                    <Label>Min Salary (₹)</Label>
                    <Input name="salary_min" type="number" value={formData.salary_min} onChange={handleInputChange} required />
                  </div>
                  <div className="space-y-2">
                    <Label>Max Salary (₹)</Label>
                    <Input name="salary_max" type="number" value={formData.salary_max} onChange={handleInputChange} required />
                  </div>
                  <div className="space-y-2">
                    <Label>Status</Label>
                    <Select name="status" value={formData.status} onValueChange={(v) => handleSelectChange('status', v)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="New">New</SelectItem>
                        <SelectItem value="Interviewing">Interviewing</SelectItem>
                        <SelectItem value="Hired">Hired</SelectItem>
                        <SelectItem value="Rejected">Rejected</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
            <DialogFooter>
              <Button type="submit">Update Candidate</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Dashboard;
