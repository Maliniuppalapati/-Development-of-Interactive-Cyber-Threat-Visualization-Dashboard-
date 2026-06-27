import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import MainLayout from '@/components/layout/MainLayout';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Mail,
  Shield,
  AlertTriangle,
  CheckCircle,
  XCircle,
  ScanSearch,
} from 'lucide-react';

interface AnalysisResult {
  isPhishing: boolean;
  confidence: number;
  analysis: string;
  threats: string[];
}

const EmailAnalyzer = () => {
  const { token } = useAuth();
  const [emailContent, setEmailContent] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const analyzeEmail = async () => {
    if (!emailContent.trim()) return;

    setIsScanning(true);
    setResult(null);

    try {
      const apiUrl = import.meta.env.VITE_API_URL || '';
      const res = await fetch(`${apiUrl}/api/ai/analyze-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ content: emailContent })
      });

      const data = await res.json();

      if (res.ok) {
        setResult(data);
      } else {
        console.error('Scan Error:', data);
      }
    } catch (error) {
      console.error("Analysis Error", error);
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold gradient-text">Phishing Email Analyzer</h1>
          <p className="text-muted-foreground mt-1">
            Paste raw email headers or body text to analyze it for phishing indicators using AI.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input Area */}
          <Card className="soc-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-primary" />
                Email Content
              </CardTitle>
              <CardDescription>
                Paste the suspicious email text here.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea 
                className="min-h-[300px] font-mono text-sm"
                placeholder="Return-Path: <scammer@fake-domain.com>&#10;Subject: URGENT: Account Suspension&#10;...&#10;&#10;Dear user, please click the link below..."
                value={emailContent}
                onChange={(e) => setEmailContent(e.target.value)}
              />
              <Button onClick={analyzeEmail} disabled={isScanning || !emailContent.trim()} className="w-full">
                {isScanning ? (
                  <ScanSearch className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Shield className="h-4 w-4 mr-2" />
                )}
                {isScanning ? 'Analyzing with AI...' : 'Analyze Email'}
              </Button>
            </CardContent>
          </Card>

          {/* Result Area */}
          <Card className={cn(
            'soc-card transition-all',
            result && (result.isPhishing ? 'border-destructive/50' : 'border-accent/50')
          )}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ScanSearch className="h-5 w-5 text-primary" />
                Analysis Result
              </CardTitle>
            </CardHeader>
            <CardContent>
              {result ? (
                <div className="space-y-6 animate-fade-in">
                  {/* Status Banner */}
                  <div
                    className={cn(
                      'p-4 rounded-lg flex items-center gap-3',
                      !result.isPhishing
                        ? 'bg-accent/10 border border-accent/30'
                        : 'bg-destructive/10 border border-destructive/30'
                    )}
                  >
                    {!result.isPhishing ? (
                      <CheckCircle className="h-8 w-8 text-accent" />
                    ) : (
                      <AlertTriangle className="h-8 w-8 text-destructive" />
                    )}
                    <div>
                      <p className={cn(
                        'font-bold text-lg',
                        !result.isPhishing ? 'text-accent' : 'text-destructive'
                      )}>
                        {!result.isPhishing ? 'Email appears safe.' : 'Phishing Detected!'}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        AI Confidence: {result.confidence}%
                      </p>
                    </div>
                  </div>

                  {/* AI Reasoning */}
                  <div>
                     <h3 className="text-sm font-semibold mb-2">AI Analysis</h3>
                     <p className="text-sm text-muted-foreground bg-secondary/50 p-4 rounded-md border">
                        {result.analysis}
                     </p>
                  </div>

                  {/* Threats */}
                  {result.threats && result.threats.length > 0 && (
                    <div className="pt-4 border-t border-border">
                      <p className="text-sm text-muted-foreground mb-2">Detected Tactics</p>
                      <div className="flex flex-wrap gap-2">
                        {result.threats.map((threat) => (
                          <Badge key={threat} className="bg-destructive/20 text-destructive">
                            <XCircle className="h-3 w-3 mr-1" />
                            {threat}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-12 text-muted-foreground flex flex-col items-center justify-center h-full">
                  <Shield className="h-16 w-16 mb-4 opacity-20" />
                  <p>Paste an email and click Analyze to view results.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default EmailAnalyzer;
