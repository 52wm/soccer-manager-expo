import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FORMATIONS } from '@/constants/formations';

// Detailed player stats interface
export interface PlayerStats {
  // 공격
  마무리: number;
  중거리슛: number;
  프리킥: number;
  페널티킥: number;
  헌팅: number; // 골 냄새 맡는 능력 (공격 위치선정)
  
  // 수비
  슬라이딩: number;
  스탠딩태클: number;
  대인방어: number;
  수비조직력: number; // 수비 위치선정
  
  // 패스
  숏패스: number;
  롱패스: number;
  크로스: number;
  
  // 스피드
  속도: number;
  가속도: number;
  민첩성: number;
  드리블: number;
  
  // 테크닉
  헤딩: number;
  위치선정: number;
  개인기: number;
  커브: number;
  볼컨트롤: number; // 퍼스트 터치
  
  // 피지컬
  스태미너: number;
  파워: number;
  바디밸런스: number;
  헤더: number;
  점프높이: number;
  
  // 멘탈
  침착성: number;
  창의성: number; // 다양한 형태의 킥 구사 확률
  집중력: number;
  시야: number;
  재능: number;
  
  // 골키퍼 (골키퍼가 아닌 경우 0)
  골키핑?: number;
  반사신경?: number;
  킥력?: number;
  수비조율?: number;
  공중볼?: number;
  골키퍼위치선정?: number;
}

// 선수 고유 정보 인터페이스
export interface PlayerInfo {
  키: number; // cm
  몸무게: number; // kg
  나이: number;
  소속리그: string;
  소속클럽: string;
  국가: string;
  부상빈도: number; // 1-10
  리더십: number; // 1-10
  주발: '왼발' | '오른발' | '양발';
  습득개인기: string[]; // 개인기 목록
  등번호?: number; // 대표적인 등번호
  클럽경력?: string[]; // 거쳐간 주요 클럽 목록
  국가대표경력?: string; // 국가대표팀 출전 횟수 및 주요 대회
  출신지?: string; // 출신 도시/지역
}

export interface TrainingHistory {
  date: string;
  type: string;
  statsImproved: Record<string, number>;
  intensity: number;
}

export interface Player {
  id: number;
  name: string; // 약식 이름 (이니셜 + 성)
  fullName?: string; // 전체 이름 (이름 + 성)
  position: string;
  rating: number;
  image: string;
  customImage?: string; // 사용자 지정 이미지 URL
  rarity: 'bronze' | 'silver' | 'gold' | 'ace';
  nationality: string;
  fieldPosition?: string;
  
  // 추가된 필드
  level: number; // 선수 레벨 (1-10)
  enhancementLevel: number; // 강화 단계 (0-10)
  stats: PlayerStats; // 세부 스탯
  info?: PlayerInfo; // 고유 정보 (선택적)
  playStyle?: string; // 플레이 스타일
  experience: number; // 현재 경험치
  maxExperience: number; // 다음 레벨까지 필요한 경험치
  customName?: string; // 사용자 지정 이름
  trainingHistory?: TrainingHistory[]; // 훈련 기록
  fatigue?: number; // 피로도 (0-100)
  condition?: number; // 컨디션 (1-5)
  specialTraining?: {
    type: string;
    endDate: string;
    effects: Record<string, number>;
  }; // 특별 훈련 정보
}

// League standings interface
export interface TeamStanding {
  position: number;
  team: {
    name: string;
    logo: string;
  };
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
  form: string[];
  isPromoted?: boolean;
  isEuropa?: boolean;
  isConference?: boolean;
}

interface TrainingState {
  selectedPlayer: number | null;
  selectedTrainingType: string | null;
  trainingProgress: number;
  trainingIntensity: string;
}

interface SquadState {
  players: Player[];
  selectedFormation: string;
  teamName: string;
  teamLogo?: string;
  leagueName?: string;
  teamChemistry: number;
  teamRating: number;
  training: TrainingState;
  leagueStandings: TeamStanding[];
  potentialCards: number; // 보유한 잠재력 카드 수
  trainingVouchers: number; // 보유한 훈련 전수권 수
  
  // Actions
  setSelectedFormation: (formation: string) => void;
  swapPlayers: (playerId1: number, playerId2: number) => void;
  movePlayerToPosition: (playerId: number, position: string) => void;
  removePlayerFromField: (playerId: number) => void;
  addPlayerToField: (playerId: number, position: string) => void;
  
  // Training actions
  selectPlayerForTraining: (playerId: number | null) => void;
  selectTrainingType: (type: string | null) => void;
  setTrainingIntensity: (intensity: string) => void;
  trainPlayer: (playerId: number, partnerId: number, experienceGain: number, intensityMultiplier?: number) => void;
  enhancePlayer: (playerId: number, enhancementCards: number, useVoucher?: boolean) => void;
  levelUpPlayer: (playerId: number, statToImprove: keyof PlayerStats) => void;
  
  // Name and image customization
  setCustomPlayerName: (playerId: number, customName: string) => void;
  setCustomPlayerImage: (playerId: number, imageUrl: string) => void;
  setTeamName: (name: string) => void;
  setTeamLogo: (logoUrl: string) => void;
  setLeagueName: (name: string) => void;
  
  // Inventory management
  addPotentialCards: (amount: number) => void;
  addTrainingVouchers: (amount: number) => void;
}

// Mock data for league standings
const LEAGUE_STANDINGS: TeamStanding[] = [
  {
    position: 1,
    team: {
      name: '맨체스터 시티',
      logo: 'https://images.unsplash.com/photo-1589487391730-58f20eb2c308?q=80&w=2074&auto=format&fit=crop',
    },
    played: 36,
    won: 26,
    drawn: 7,
    lost: 3,
    goalsFor: 89,
    goalsAgainst: 32,
    goalDifference: 57,
    points: 85,
    form: ['W', 'W', 'D', 'W', 'W'],
  },
  // Add more teams as needed
];

// Function to generate player stats based on position and rating
const generatePlayerStats = (position: string, rating: number): PlayerStats => {
  // Base stats calculation logic
  const baseValue = Math.max(rating - 20, 0);
  
  // Initialize with base stats
  const stats: PlayerStats = {
    // 공격
    마무리: baseValue,
    중거리슛: baseValue,
    프리킥: baseValue,
    페널티킥: baseValue,
    헌팅: baseValue,
    
    // 수비
    슬라이딩: baseValue,
    스탠딩태클: baseValue,
    대인방어: baseValue,
    수비조직력: baseValue,
    
    // 패스
    숏패스: baseValue,
    롱패스: baseValue,
    크로스: baseValue,
    
    // 스피드
    속도: baseValue,
    가속도: baseValue,
    민첩성: baseValue,
    드리블: baseValue,
    
    // 테크닉
    헤딩: baseValue,
    위치선정: baseValue,
    개인기: baseValue,
    커브: baseValue,
    볼컨트롤: baseValue,
    
    // 피지컬
    스태미너: baseValue,
    파워: baseValue,
    바디밸런스: baseValue,
    헤더: baseValue,
    점프높이: baseValue,
    
    // 멘탈
    침착성: baseValue,
    창의성: baseValue,
    집중력: baseValue,
    시야: baseValue,
    재능: baseValue,
  };
  
  // Return modified stats based on position
  return stats;
};

// 샘플 플레이어 데이터
const samplePlayers: Player[] = [
  // GK
  {
    id: 1,
    name: '드 헤아',
    fullName: '다비드 데 헤아',
    position: 'GK',
    rating: 87,
    image: 'https://media.contentapi.ea.com/content/dam/ea/fifa/fifa-21/ratings-collective/f21-rc-portraits/248.png.adapt.crop1x1.652w.png',
    rarity: 'gold',
    nationality: '스페인',
    fieldPosition: 'GK',
    level: 1,
    enhancementLevel: 0,
    stats: generatePlayerStats('GK', 87),
    experience: 0,
    maxExperience: 1000,
    fatigue: 0,
    condition: 5,
  },
  // Add more players
];

// Create persisted store
export const useSquadStore = create<SquadState>()(
  persist(
    (set, get) => ({
      players: samplePlayers,
      selectedFormation: '4-3-3',
      teamName: '맨체스터 유나이티드',
      teamChemistry: 85,
      teamRating: 83,
      training: {
        selectedPlayer: null,
        selectedTrainingType: null,
        trainingProgress: 0,
        trainingIntensity: '보통',
      },
      leagueStandings: LEAGUE_STANDINGS,
      potentialCards: 5,
      trainingVouchers: 3,
      
      // Formation management
      setSelectedFormation: (formation: string) => set({ selectedFormation: formation }),
      
      // Player management
      swapPlayers: (playerId1: number, playerId2: number) => {
        set((state) => {
          const players = [...state.players];
          const player1Index = players.findIndex(p => p.id === playerId1);
          const player2Index = players.findIndex(p => p.id === playerId2);
          
          if (player1Index === -1 || player2Index === -1) return state;
          
          const player1 = { ...players[player1Index] };
          const player2 = { ...players[player2Index] };
          
          // Swap field positions
          const tempPosition = player1.fieldPosition;
          player1.fieldPosition = player2.fieldPosition;
          player2.fieldPosition = tempPosition;
          
          players[player1Index] = player1;
          players[player2Index] = player2;
          
          return { players };
        });
      },
      
      movePlayerToPosition: (playerId: number, position: string) => {
        set((state) => {
          const players = [...state.players];
          const playerIndex = players.findIndex(p => p.id === playerId);
          
          if (playerIndex === -1) return state;
          
          // Check if position is already occupied
          const occupiedIndex = players.findIndex(p => p.fieldPosition === position);
          
          if (occupiedIndex !== -1) {
            // If occupied, remove current player from position
            players[occupiedIndex] = {
              ...players[occupiedIndex],
              fieldPosition: undefined,
            };
          }
          
          // Move selected player to position
          players[playerIndex] = {
            ...players[playerIndex],
            fieldPosition: position,
          };
          
          return { players };
        });
      },
      
      removePlayerFromField: (playerId: number) => {
        set((state) => {
          const players = [...state.players];
          const playerIndex = players.findIndex(p => p.id === playerId);
          
          if (playerIndex === -1) return state;
          
          players[playerIndex] = {
            ...players[playerIndex],
            fieldPosition: undefined,
          };
          
          return { players };
        });
      },
      
      addPlayerToField: (playerId: number, position: string) => {
        set((state) => {
          const players = [...state.players];
          const playerIndex = players.findIndex(p => p.id === playerId);
          
          if (playerIndex === -1) return state;
          
          // Check if position is already occupied
          const occupiedIndex = players.findIndex(p => p.fieldPosition === position);
          
          if (occupiedIndex !== -1) {
            // If occupied, remove current player from position
            players[occupiedIndex] = {
              ...players[occupiedIndex],
              fieldPosition: undefined,
            };
          }
          
          // Move selected player to position
          players[playerIndex] = {
            ...players[playerIndex],
            fieldPosition: position,
          };
          
          return { players };
        });
      },
      
      // Training
      selectPlayerForTraining: (playerId: number | null) => {
        set((state) => ({
          training: {
            ...state.training,
            selectedPlayer: playerId,
          },
        }));
      },
      
      selectTrainingType: (type: string | null) => {
        set((state) => ({
          training: {
            ...state.training,
            selectedTrainingType: type,
          },
        }));
      },
      
      setTrainingIntensity: (intensity: string) => {
        set((state) => ({
          training: {
            ...state.training,
            trainingIntensity: intensity,
          },
        }));
      },
      
      trainPlayer: (playerId: number, partnerId: number, experienceGain: number, intensityMultiplier = 1) => {
        set((state) => {
          const players = [...state.players];
          const playerIndex = players.findIndex(p => p.id === playerId);
          
          if (playerIndex === -1) return state;
          
          const player = { ...players[playerIndex] };
          const totalExperience = player.experience + (experienceGain * intensityMultiplier);
          
          // Check if player levels up
          if (totalExperience >= player.maxExperience) {
            player.level += 1;
            player.experience = totalExperience - player.maxExperience;
            player.maxExperience = calculateMaxExperience(player.level);
            
            // Update player stats based on training type
            // This would be implemented based on the selected training type
          } else {
            player.experience = totalExperience;
          }
          
          // Add fatigue based on intensity
          player.fatigue = Math.min((player.fatigue || 0) + (10 * intensityMultiplier), 100);
          
          players[playerIndex] = player;
          
          return { players };
        });
      },
      
      enhancePlayer: (playerId: number, enhancementCards: number, useVoucher = false) => {
        set((state) => {
          // Check if player has enough cards
          if (!useVoucher && state.potentialCards < enhancementCards) {
            return state;
          }
          
          const players = [...state.players];
          const playerIndex = players.findIndex(p => p.id === playerId);
          
          if (playerIndex === -1) return state;
          
          const player = { ...players[playerIndex] };
          
          // Apply enhancement
          player.enhancementLevel = Math.min(player.enhancementLevel + 1, 10);
          
          // Apply stat boosts based on enhancement level
          // This would boost all core stats by a percentage
          
          players[playerIndex] = player;
          
          return {
            players,
            potentialCards: useVoucher
              ? state.potentialCards
              : state.potentialCards - enhancementCards,
            trainingVouchers: useVoucher
              ? state.trainingVouchers - 1
              : state.trainingVouchers,
          };
        });
      },
      
      levelUpPlayer: (playerId: number, statToImprove: keyof PlayerStats) => {
        set((state) => {
          const players = [...state.players];
          const playerIndex = players.findIndex(p => p.id === playerId);
          
          if (playerIndex === -1) return state;
          
          const player = { ...players[playerIndex] };
          const stats = { ...player.stats };
          
          // Improve selected stat
          stats[statToImprove] = Math.min((stats[statToImprove] || 0) + 1, 99);
          player.stats = stats;
          
          // Reset experience
          player.experience = 0;
          
          players[playerIndex] = player;
          
          return { players };
        });
      },
      
      // Customization
      setCustomPlayerName: (playerId: number, customName: string) => {
        set((state) => {
          const players = [...state.players];
          const playerIndex = players.findIndex(p => p.id === playerId);
          
          if (playerIndex === -1) return state;
          
          players[playerIndex] = {
            ...players[playerIndex],
            customName,
          };
          
          return { players };
        });
      },
      
      setCustomPlayerImage: (playerId: number, imageUrl: string) => {
        set((state) => {
          const players = [...state.players];
          const playerIndex = players.findIndex(p => p.id === playerId);
          
          if (playerIndex === -1) return state;
          
          players[playerIndex] = {
            ...players[playerIndex],
            customImage: imageUrl,
          };
          
          return { players };
        });
      },
      
      setTeamName: (name: string) => set({ teamName: name }),
      setTeamLogo: (logoUrl: string) => set({ teamLogo: logoUrl }),
      setLeagueName: (name: string) => set({ leagueName: name }),
      
      // Inventory
      addPotentialCards: (amount: number) => {
        set((state) => ({
          potentialCards: state.potentialCards + amount,
        }));
      },
      
      addTrainingVouchers: (amount: number) => {
        set((state) => ({
          trainingVouchers: state.trainingVouchers + amount,
        }));
      },
    }),
    {
      name: 'squad-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

// Helper function to calculate max experience for a level
const calculateMaxExperience = (level: number): number => {
  return 1000 * Math.pow(1.2, level - 1);
};