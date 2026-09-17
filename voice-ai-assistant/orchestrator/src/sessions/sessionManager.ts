export type SessionRecord = {
  sessionId: string;
  userId?: string;
  status: "connected" | "active" | "ended";
  createdAt: string;
};

export class SessionManager {
  private sessions = new Map<string, SessionRecord>();

  createSession(sessionId: string, userId?: string): SessionRecord {
    const record: SessionRecord = {
      sessionId,
      userId,
      status: "connected",
      createdAt: new Date().toISOString(),
    };

    this.sessions.set(sessionId, record);
    return record;
  }

  getSession(sessionId: string): SessionRecord | undefined {
    return this.sessions.get(sessionId);
  }

  updateStatus(sessionId: string, status: SessionRecord["status"]): SessionRecord | undefined {
    const session = this.sessions.get(sessionId);

    if (!session) {
      return undefined;
    }

    session.status = status;
    return session;
  }
}
