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

  // on the first render, get all attendees
  useEffect(() => {
    const fetchMembers = async () => {
      setIsLoading(true);

      try {
        const attendees = (await request({
          route: '/api/v1/get-attendees/WCCxBCGOpeningEvent',
          type: 'GET',
        })).data.attendees;

        setMembers(attendees);
        setFilteredMembers(attendees);
      } catch (error) {
        setAlert({
          type: 'error',
          message: error.message || 'An error occurred while fetching members.',
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchMembers();
  }, [filteredMembers.length]);

  const handleScan = async (err, data) => {
    if (data) {
      setShowScanner(false);
      setIsLoading(true);

      try {
        const url = new URL(data.text);
        const path = url.pathname;
        const endpoint = "/api/v1" + path.split('/api/v1')[1];

        const response = await request({
          route: endpoint, // /api/v1/add-attendee/:eventName/:email
          type: 'POST',
        });

        // Add new member to the list
        if (response.data?.member) {
          setMembers(prev => [...prev, response.data.member]);
        }

        setAlert({
          type: 'success',
          message: `Welcome, ${response.data.member.fullname || 'Member'}!`,
        });

        // get eventName from endpoint
        const eventName = path.split('/api/v1/add-attendee/')[1].split('/')[0];

        const attendees = (await request({
          route: `/api/v1/get-attendees/${eventName}`,
          type: 'GET',
        })).data.attendees;

        setMembers(attendees);
        setFilteredMembers(attendees);
      } catch (error) {
        setAlert({
          type: 'error',
          message: error.message || 'An error occurred while processing the QR code.',
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
        <Button className="cursor-pointer" onClick={() => setShowScanner(true)}>
          Scan QR Code
        </Button>
        <Button variant="destructive" className="cursor-pointer" onClick={handleLogout}>
          Logout
        </Button>
      </div>

      {/* Search Bar */}
      <div className="mb-4">
        <Input
          placeholder="Search members by name..."
          value={searchTerm}
          onChange={(e) => {
            const term = e.target.value;
            setSearchTerm(term);
            setFilteredMembers(
              members.filter((member) => member.fullname.toLowerCase().includes(term.toLowerCase()))
            );
          }}
        />
      </div>

      {/* Member List */}
      <Card className="flex-1">
        <ScrollArea className="h-full flex gap-5">
          <CardContent className="p-4">
            {filteredMembers.length === 0 ? (
              <p className="text-muted-foreground text-center py-4">
                {members.length === 0 ? 'No members scanned yet' : 'No matching members found'}
              </p>
            ) : (
              filteredMembers.map((member) => (
                <MemberCard key={member.email} {...member} />
              ))
            )}
          </CardContent>
        </ScrollArea>
      </Card>

      {/* QR Scanner Dialog */}
      <Dialog open={showScanner} onOpenChange={setShowScanner}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Scan QR Code</DialogTitle>
          </DialogHeader>
          <div className="w-full">
            <BarcodeScannerComponent
              onUpdate={handleScan}
              width="100%"
              height={300}
            />
          </div>
        </DialogContent>
      </Dialog>

      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
          <Loader2 className="h-8 w-8 animate-spin text-white" />
        </div>
      )}

      {/* Alert Dialog */}
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