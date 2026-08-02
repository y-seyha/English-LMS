import { useEffect, useState, useRef } from 'react'
import { io, type Socket } from 'socket.io-client'

const SOCKET_URL = (import.meta as any).env.VITE_API_URL
  ? ((import.meta as any).env.VITE_API_URL as string).replace('/api', '')
  : 'http://localhost:4000'

export function useAdminSocket() {
  const [isConnected, setIsConnected] = useState(false)
  const [liveStats, setLiveStats] = useState<any>(null)
  const [liveActivity, setLiveActivity] = useState<any>(null)
  const socketRef = useRef<Socket | null>(null)

  useEffect(() => {
    const socket = io(`${SOCKET_URL}/admin`, {
      transports: ['websocket', 'polling'],
    })
    socketRef.current = socket

    socket.on('connect', () => setIsConnected(true))
    socket.on('disconnect', () => setIsConnected(false))

    socket.on('admin:stats', (data: any) => setLiveStats(data))
    socket.on('admin:activity', (data: any) => setLiveActivity(data))
    socket.on('admin:stats-update', (data: any) => setLiveStats(data))
    socket.on('admin:activity-update', (data: any) => setLiveActivity(data))

    return () => {
      socket.disconnect()
      socketRef.current = null
    }
  }, [])

  return { isConnected, liveStats, liveActivity, socket: socketRef.current }
}
