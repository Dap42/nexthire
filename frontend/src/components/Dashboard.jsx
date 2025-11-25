import React, { useState, useEffect } from 'react';
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
import { Plus, Search, Filter, Trash2, Edit, X, Users, Briefcase, CheckCircle, XCircle, Zap, MapPin, IndianRupee, ExternalLink, GraduationCap, Award, Linkedin, Github, Globe, FileText, Calendar, CreditCard, Clock, Monitor, Languages, UserCheck, Building2 } from 'lucide-react';
import { ModeToggle } from "@/components/mode-toggle";
import { useNavigate } from 'react-router-dom';
import * as candidateService from '@/services/candidateService';

const Dashboard = () => {
  const navigate = useNavigate();
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
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
      const data = await candidateService.getCandidates();
      setCandidates(data);
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
        await candidateService.updateCandidate(currentCandidate.id, payload);
        toast.success("Candidate updated successfully");
      } else {
        await candidateService.createCandidate(payload);
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
        await candidateService.deleteCandidate(id);
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

  const openDetail = (candidate) => {
    setCurrentCandidate(candidate);
    setIsDetailOpen(true);
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
                  <TableRow 
                    key={candidate.id} 
                    className="group hover:bg-muted/50 transition-colors cursor-pointer" 
                    data-testid={`row-${candidate.id}`}
                    onClick={() => openDetail(candidate)}
                  >
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
                        <Button variant="ghost" size="icon" onClick={(e) => { e.stopPropagation(); openEdit(candidate); }} data-testid={`edit-${candidate.id}`}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" onClick={(e) => { e.stopPropagation(); handleDelete(candidate.id); }} data-testid={`delete-${candidate.id}`}>
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

      {/* Candidate Detail Dialog */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
          {currentCandidate && (
            <>
              <DialogHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <DialogTitle className="text-2xl">{currentCandidate.name}</DialogTitle>
                    <p className="text-muted-foreground mt-1">{currentCandidate.role}</p>
                  </div>
                  <Badge className={getStatusColor(currentCandidate.status)} variant="outline">
                    {currentCandidate.status}
                  </Badge>
                </div>
              </DialogHeader>

              <div className="space-y-6 mt-4">
                {/* Summary Section */}
                {currentCandidate.summary && (
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <p className="text-sm leading-relaxed">{currentCandidate.summary}</p>
                  </div>
                )}

                {/* Contact Information */}
                <div>
                  <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Contact Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-muted-foreground">Email:</span>
                      <a href={`mailto:${currentCandidate.email}`} className="text-primary hover:underline">
                        {currentCandidate.email}
                      </a>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-muted-foreground">Phone:</span>
                      <a href={`tel:${currentCandidate.phone}`} className="text-primary hover:underline">
                        {currentCandidate.phone}
                      </a>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-3 w-3 text-muted-foreground" />
                      <span className="text-muted-foreground">Location:</span>
                      <span>{currentCandidate.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-3 w-3 text-muted-foreground" />
                      <span className="text-muted-foreground">Applied:</span>
                      <span>{new Date(currentCandidate.created_at).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                    </div>
                    {currentCandidate.aadhaar && (
                      <div className="flex items-center gap-2 text-sm">
                        <CreditCard className="h-3 w-3 text-muted-foreground" />
                        <span className="text-muted-foreground">Aadhaar:</span>
                        <span className="font-mono">{currentCandidate.aadhaar}</span>
                      </div>
                    )}
                    {currentCandidate.languages && currentCandidate.languages.length > 0 && (
                      <div className="flex items-center gap-2 text-sm">
                        <Languages className="h-3 w-3 text-muted-foreground" />
                        <span className="text-muted-foreground">Languages:</span>
                        <span>{currentCandidate.languages.join(', ')}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Employment Details */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {currentCandidate.current_ctc && (
                    <div className="bg-card border border-border rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <IndianRupee className="h-4 w-4 text-muted-foreground" />
                        <h3 className="text-sm font-semibold">Current CTC</h3>
                      </div>
                      <p className="text-lg font-bold">{formatCurrency(currentCandidate.current_ctc)}</p>
                    </div>
                  )}
                  {currentCandidate.notice_period && (
                    <div className="bg-card border border-border rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <h3 className="text-sm font-semibold">Notice Period</h3>
                      </div>
                      <p className="text-lg font-bold">{currentCandidate.notice_period}</p>
                    </div>
                  )}
                  {currentCandidate.work_mode && (
                    <div className="bg-card border border-border rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Monitor className="h-4 w-4 text-muted-foreground" />
                        <h3 className="text-sm font-semibold">Work Mode</h3>
                      </div>
                      <p className="text-lg font-bold">{currentCandidate.work_mode}</p>
                    </div>
                  )}
                </div>

                {/* Professional Links */}
                <div>
                  <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                    <ExternalLink className="h-4 w-4" />
                    Professional Links
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {currentCandidate.linkedin && (
                      <a 
                        href={currentCandidate.linkedin} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-3 py-2 bg-blue-500/10 text-blue-500 rounded-lg hover:bg-blue-500/20 transition-colors text-sm"
                      >
                        <Linkedin className="h-4 w-4" />
                        LinkedIn
                      </a>
                    )}
                    {currentCandidate.github && (
                      <a 
                        href={currentCandidate.github} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-3 py-2 bg-gray-500/10 text-gray-500 dark:text-gray-400 rounded-lg hover:bg-gray-500/20 transition-colors text-sm"
                      >
                        <Github className="h-4 w-4" />
                        GitHub
                      </a>
                    )}
                    {currentCandidate.portfolio && (
                      <a 
                        href={currentCandidate.portfolio} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-3 py-2 bg-purple-500/10 text-purple-500 rounded-lg hover:bg-purple-500/20 transition-colors text-sm"
                      >
                        <Globe className="h-4 w-4" />
                        Portfolio
                      </a>
                    )}
                  </div>
                </div>

                {/* Experience & Salary */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-card border border-border rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Briefcase className="h-4 w-4 text-muted-foreground" />
                      <h3 className="text-sm font-semibold">Experience</h3>
                    </div>
                    <p className="text-2xl font-bold">{currentCandidate.experience_years} years</p>
                  </div>
                  <div className="bg-card border border-border rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <IndianRupee className="h-4 w-4 text-muted-foreground" />
                      <h3 className="text-sm font-semibold">Salary Expectation</h3>
                    </div>
                    <p className="text-lg font-bold">
                      {formatCurrency(currentCandidate.salary_min)} - {formatCurrency(currentCandidate.salary_max)}
                    </p>
                  </div>
                </div>

                {/* Skills */}
                <div>
                  <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                    <Zap className="h-4 w-4" />
                    Skills & Expertise
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {currentCandidate.skills.map((skill, i) => (
                      <Badge key={i} variant="secondary" className="font-normal">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Education */}
                {currentCandidate.education && (
                  <div>
                    <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                      <GraduationCap className="h-4 w-4" />
                      Education
                    </h3>
                    <p className="text-sm bg-muted/50 p-3 rounded-lg">{currentCandidate.education}</p>
                  </div>
                )}

                {/* Certifications */}
                {currentCandidate.certifications && currentCandidate.certifications.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                      <Award className="h-4 w-4" />
                      Certifications
                    </h3>
                    <ul className="space-y-2">
                      {currentCandidate.certifications.map((cert, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>{cert}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Work Experience */}
                {currentCandidate.work_experience && currentCandidate.work_experience.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                      <Building2 className="h-4 w-4" />
                      Work Experience
                    </h3>
                    <div className="space-y-4">
                      {currentCandidate.work_experience.map((exp, i) => (
                        <div key={i} className="border-l-2 border-primary pl-4 pb-4 last:pb-0">
                          <div className="flex items-start justify-between mb-1">
                            <h4 className="font-semibold text-sm">{exp.role}</h4>
                            <Badge variant="outline" className="text-xs">{exp.duration}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{exp.company}</p>
                          <p className="text-sm leading-relaxed">{exp.responsibilities}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* References */}
                {currentCandidate.references && currentCandidate.references.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                      <UserCheck className="h-4 w-4" />
                      Professional References
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {currentCandidate.references.map((ref, i) => (
                        <div key={i} className="bg-muted/50 p-3 rounded-lg">
                          <p className="font-semibold text-sm">{ref.name}</p>
                          <p className="text-xs text-muted-foreground mb-1">{ref.designation}</p>
                          <a href={`tel:${ref.contact}`} className="text-xs text-primary hover:underline">
                            {ref.contact}
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Internal Notes */}
                {currentCandidate.notes && (
                  <div>
                    <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      Internal Notes
                    </h3>
                    <div className="bg-yellow-500/10 border border-yellow-500/20 p-4 rounded-lg">
                      <p className="text-sm text-yellow-900 dark:text-yellow-100">{currentCandidate.notes}</p>
                    </div>
                  </div>
                )}
              </div>

              <DialogFooter className="mt-6">
                <Button variant="outline" onClick={() => setIsDetailOpen(false)}>
                  Close
                </Button>
                <Button onClick={() => { setIsDetailOpen(false); openEdit(currentCandidate); }}>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Candidate
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Dashboard;
