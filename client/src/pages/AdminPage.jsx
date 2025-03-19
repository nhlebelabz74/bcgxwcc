import React, { useState, useEffect } from 'react';
import BarcodeScannerComponent from 'react-qr-barcode-scanner';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/authContext';
import request from '@/utils/request';
import { Loader2 } from 'lucide-react';

const MemberCard = ({ fullname, email }) => (
  <div className="p-4 rounded-2xl border bg-accent border-ring hover:shadow-xl transition-colors cursor-pointer">
    <div>{fullname}</div>
    <div className="text-sm text-muted-foreground">{email}</div>
  </div>
);

const AdminPage = () => {
  const [showScanner, setShowScanner] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [alert, setAlert] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [members, setMembers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredMembers, setFilteredMembers] = useState([]);

  // Fetch initial members
  useEffect(() => {
    const fetchMembers = async () => {
      setIsLoading(true);
      try {
        const response = await request({
          route: '/api/v1/get-attendees/WCCxBCGOpeningEvent',
          type: 'GET',
        });
        setMembers(response.data.attendees);
      } catch (error) {
        setAlert({
          type: 'error',
          message: error.message || 'Failed to load members',
        });
      } finally {
        setIsLoading(false);
      }
    };
    fetchMembers();
  }, []);

  // SSE for real-time updates
  useEffect(() => {
    const eventSource = new EventSource('/api/v1/updates');

    eventSource.addEventListener('new-member', (event) => {
      const newMember = JSON.parse(event.data);
      setMembers(prev => [...prev, newMember]);
    });

    eventSource.onerror = (error) => {
      console.error('SSE error:', error);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, []);

  // Update filtered members when search or members change
  useEffect(() => {
    const filtered = members.filter(member =>
      member.fullname.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredMembers(filtered);
  }, [members, searchTerm]);

  const handleScan = async (err, data) => {
    if (data) {
      setShowScanner(false);
      setIsLoading(true);

      try {
        const url = new URL(data.text);
        const path = url.pathname;
        const endpoint = "/api/v1" + path.split('/api/v1')[1];

        await request({
          route: endpoint,
          type: 'POST',
        });

        setAlert({
          type: 'success',
          message: 'Member added successfully!',
        });

      } catch (error) {
        setAlert({
          type: 'error',
          message: error.message || 'Failed to process QR code',
        });
      } finally {
        setIsLoading(false);
      }
    } else if (err) {
      console.error(err);
    }
  };

  const handleLogout = () => {
    navigate('/login');
    logout();
  };

  const handleAlertClose = () => {
    setAlert(null);
  };

  return (
    <div className="p-4 flex flex-col h-screen">
      <div className="flex justify-between mb-4">
        <Button onClick={() => setShowScanner(true)} className="cursor-pointer">
          Scan QR Code
        </Button>
        <Button variant="destructive" className="cursor-pointer" onClick={handleLogout}>
          Logout
        </Button>
      </div>

      <div className="mb-4">
        <Input
          placeholder="Search members..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <Card className="flex-1">
        <ScrollArea className="h-full">
          <CardContent className="p-4 flex gap-5 flex-wrap">
            {filteredMembers.length === 0 ? (
              <p className="text-muted-foreground text-center py-4 w-full">
                {members.length === 0 ? 'No members yet' : 'No matches found'}
              </p>
            ) : (
              filteredMembers.map((member) => (
                <MemberCard key={member.email} {...member} />
              ))
            )}
          </CardContent>
        </ScrollArea>
      </Card>

      <Dialog open={showScanner} onOpenChange={setShowScanner}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Scan QR Code</DialogTitle>
          </DialogHeader>
          <BarcodeScannerComponent
            onUpdate={handleScan}
            width="100%"
            height={300}
          />
        </DialogContent>
      </Dialog>

      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
          <Loader2 className="h-8 w-8 animate-spin text-white" />
        </div>
      )}

      <Dialog open={!!alert} onOpenChange={handleAlertClose}>
        <DialogContent className={alert?.type === 'error' ? 'border-destructive' : ''}>
          <DialogHeader>
            <DialogTitle className={alert?.type === 'error' ? 'text-destructive' : 'text-green-600'}>
              {alert?.type === 'success' ? 'Success' : 'Error'}
            </DialogTitle>
            <DialogDescription>{alert?.message}</DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminPage;