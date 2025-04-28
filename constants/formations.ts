// Define a type for position coordinates
export type PositionCoordinates = {
  x: number;
  y: number;
};

// Define a type for formation positions
export type FormationPositions = {
  [position: string]: PositionCoordinates;
};

// Define the formations with proper typing
export const FORMATIONS: {[formation: string]: FormationPositions} = {
  // 3-back formations
  '3-4-3': {
    // 1st line - Forward line - evenly spaced (moved higher up)
    LW: { x: 25, y: 15 },
    ST: { x: 50, y: 15 },
    RW: { x: 75, y: 15 },
    
    // 3rd line - Midfield line - evenly spaced
    LM: { x: 20, y: 45 },
    CM1: { x: 40, y: 45 },
    CM2: { x: 60, y: 45 },
    RM: { x: 80, y: 45 },
    
    // 5th line - Defense line - evenly spaced
    CB1: { x: 30, y: 75 },
    CB2: { x: 50, y: 75 },
    CB3: { x: 70, y: 75 },
    
    // 6th line - Goalkeeper
    GK: { x: 50, y: 90 },
  },
  '3-5-2': {
    // 1st line - Forward line - evenly spaced (moved higher up)
    ST1: { x: 35, y: 15 },
    ST2: { x: 65, y: 15 },
    
    // 3rd line - Central midfield - evenly spaced
    CM1: { x: 30, y: 45 },
    CM2: { x: 50, y: 45 },
    CM3: { x: 70, y: 45 },
    
    // 4th line - Wingbacks
    LWB: { x: 15, y: 60 },
    RWB: { x: 85, y: 60 },
    
    // 5th line - Defense line - evenly spaced
    CB1: { x: 30, y: 75 },
    CB2: { x: 50, y: 75 },
    CB3: { x: 70, y: 75 },
    
    // 6th line - Goalkeeper
    GK: { x: 50, y: 90 },
  },
  '3-4-1-2': {
    // 1st line - Forward line - evenly spaced (moved higher up)
    ST1: { x: 35, y: 15 },
    ST2: { x: 65, y: 15 },
    
    // 2nd line - Attacking mid
    CAM: { x: 50, y: 30 },
    
    // 3rd line - Midfield line - evenly spaced
    LM: { x: 20, y: 45 },
    CM1: { x: 40, y: 45 },
    CM2: { x: 60, y: 45 },
    RM: { x: 80, y: 45 },
    
    // 5th line - Defense line - evenly spaced
    CB1: { x: 30, y: 75 },
    CB2: { x: 50, y: 75 },
    CB3: { x: 70, y: 75 },
    
    // 6th line - Goalkeeper
    GK: { x: 50, y: 90 },
  },
  '3-1-4-2': {
    // 1st line - Forward line - evenly spaced (moved higher up)
    ST1: { x: 35, y: 15 },
    ST2: { x: 65, y: 15 },
    
    // 3rd line - Midfield line - evenly spaced
    LM: { x: 20, y: 45 },
    CM1: { x: 40, y: 45 },
    CM2: { x: 60, y: 45 },
    RM: { x: 80, y: 45 },
    
    // 4th line - Defensive mid
    CDM: { x: 50, y: 60 },
    
    // 5th line - Defense line - evenly spaced
    CB1: { x: 30, y: 75 },
    CB2: { x: 50, y: 75 },
    CB3: { x: 70, y: 75 },
    
    // 6th line - Goalkeeper
    GK: { x: 50, y: 90 },
  },

  // 4-back formations
  '4-4-2': {
    // 1st line - Forward line - evenly spaced (moved higher up)
    ST1: { x: 35, y: 15 },
    ST2: { x: 65, y: 15 },
    
    // 3rd line - Midfield line - evenly spaced
    LM: { x: 20, y: 45 },
    CM1: { x: 40, y: 45 },
    CM2: { x: 60, y: 45 },
    RM: { x: 80, y: 45 },
    
    // 5th line - Defense line - evenly spaced
    LB: { x: 20, y: 75 },
    CB1: { x: 40, y: 75 },
    CB2: { x: 60, y: 75 },
    RB: { x: 80, y: 75 },
    
    // 6th line - Goalkeeper
    GK: { x: 50, y: 90 },
  },
  '4-3-3': {
    // 1st line - Forward line - evenly spaced (moved higher up)
    LW: { x: 20, y: 15 },
    ST: { x: 50, y: 15 },
    RW: { x: 80, y: 15 },
    
    // 3rd line - Midfield line - evenly spaced
    CM1: { x: 30, y: 45 },
    CM2: { x: 50, y: 45 },
    CM3: { x: 70, y: 45 },
    
    // 5th line - Defense line - evenly spaced
    LB: { x: 20, y: 75 },
    CB1: { x: 40, y: 75 },
    CB2: { x: 60, y: 75 },
    RB: { x: 80, y: 75 },
    
    // 6th line - Goalkeeper
    GK: { x: 50, y: 90 },
  },
  '4-3-3b': {
    // 1st line - Forward line - evenly spaced (moved higher up)
    LW: { x: 20, y: 15 },
    ST: { x: 50, y: 15 },
    RW: { x: 80, y: 15 },
    
    // 3rd line - Midfield line - evenly spaced
    CM1: { x: 35, y: 45 },
    CM2: { x: 65, y: 45 },
    
    // 4th line - Defensive mid
    CDM: { x: 50, y: 60 },
    
    // 5th line - Defense line - evenly spaced
    LB: { x: 20, y: 75 },
    CB1: { x: 40, y: 75 },
    CB2: { x: 60, y: 75 },
    RB: { x: 80, y: 75 },
    
    // 6th line - Goalkeeper
    GK: { x: 50, y: 90 },
  },
  '4-2-3-1': {
    // 1st line - Striker (moved higher up)
    ST: { x: 50, y: 15 },
    
    // 2nd line - Attacking mids - evenly spaced
    CAM1: { x: 20, y: 30 },
    CAM2: { x: 50, y: 30 },
    CAM3: { x: 80, y: 30 },
    
    // 4th line - Defensive mids - evenly spaced
    CDM1: { x: 35, y: 60 },
    CDM2: { x: 65, y: 60 },
    
    // 5th line - Defense line - evenly spaced
    LB: { x: 20, y: 75 },
    CB1: { x: 40, y: 75 },
    CB2: { x: 60, y: 75 },
    RB: { x: 80, y: 75 },
    
    // 6th line - Goalkeeper
    GK: { x: 50, y: 90 },
  },
  '4-1-4-1': {
    // 1st line - Striker (moved higher up)
    ST: { x: 50, y: 15 },
    
    // 3rd line - Midfield line - evenly spaced
    LM: { x: 20, y: 45 },
    CM1: { x: 40, y: 45 },
    CM2: { x: 60, y: 45 },
    RM: { x: 80, y: 45 },
    
    // 4th line - Defensive mid
    CDM: { x: 50, y: 60 },
    
    // 5th line - Defense line - evenly spaced
    LB: { x: 20, y: 75 },
    CB1: { x: 40, y: 75 },
    CB2: { x: 60, y: 75 },
    RB: { x: 80, y: 75 },
    
    // 6th line - Goalkeeper
    GK: { x: 50, y: 90 },
  },
  '4-4-1-1': {
    // 1st line - Striker (moved higher up)
    ST: { x: 50, y: 15 },
    
    // 2nd line - Second striker / CF
    CF: { x: 50, y: 30 },
    
    // 3rd line - Midfield line - evenly spaced
    LM: { x: 20, y: 45 },
    CM1: { x: 40, y: 45 },
    CM2: { x: 60, y: 45 },
    RM: { x: 80, y: 45 },
    
    // 5th line - Defense line - evenly spaced
    LB: { x: 20, y: 75 },
    CB1: { x: 40, y: 75 },
    CB2: { x: 60, y: 75 },
    RB: { x: 80, y: 75 },
    
    // 6th line - Goalkeeper
    GK: { x: 50, y: 90 },
  },
  '4-5-1': {
    // 1st line - Striker (moved higher up)
    ST: { x: 50, y: 15 },
    
    // 3rd line - Midfield line - evenly spaced
    LM: { x: 15, y: 45 },
    CM1: { x: 32.5, y: 45 },
    CM2: { x: 50, y: 45 },
    CM3: { x: 67.5, y: 45 },
    RM: { x: 85, y: 45 },
    
    // 5th line - Defense line - evenly spaced
    LB: { x: 20, y: 75 },
    CB1: { x: 40, y: 75 },
    CB2: { x: 60, y: 75 },
    RB: { x: 80, y: 75 },
    
    // 6th line - Goalkeeper
    GK: { x: 50, y: 90 },
  },

  // 5-back formations
  '5-3-2': {
    // 1st line - Forward line - evenly spaced (moved higher up)
    ST1: { x: 35, y: 15 },
    ST2: { x: 65, y: 15 },
    
    // 3rd line - Midfield line - evenly spaced
    CM1: { x: 30, y: 45 },
    CM2: { x: 50, y: 45 },
    CM3: { x: 70, y: 45 },
    
    // 5th line - Defense line - evenly spaced
    LWB: { x: 10, y: 75 },
    CB1: { x: 30, y: 75 },
    CB2: { x: 50, y: 75 },
    CB3: { x: 70, y: 75 },
    RWB: { x: 90, y: 75 },
    
    // 6th line - Goalkeeper
    GK: { x: 50, y: 90 },
  },
  '5-2-1-2': {
    // 1st line - Forward line - evenly spaced (moved higher up)
    ST1: { x: 35, y: 15 },
    ST2: { x: 65, y: 15 },
    
    // 2nd line - Attacking mid
    CAM: { x: 50, y: 30 },
    
    // 3rd line - Central midfield
    CM1: { x: 35, y: 45 },
    CM2: { x: 65, y: 45 },
    
    // 5th line - Defense line - evenly spaced
    LWB: { x: 10, y: 75 },
    CB1: { x: 30, y: 75 },
    CB2: { x: 50, y: 75 },
    CB3: { x: 70, y: 75 },
    RWB: { x: 90, y: 75 },
    
    // 6th line - Goalkeeper
    GK: { x: 50, y: 90 },
  },
  '5-4-1': {
    // 1st line - Striker (moved higher up)
    ST: { x: 50, y: 15 },
    
    // 3rd line - Midfield line - evenly spaced
    LM: { x: 20, y: 45 },
    CM1: { x: 40, y: 45 },
    CM2: { x: 60, y: 45 },
    RM: { x: 80, y: 45 },
    
    // 5th line - Defense line - evenly spaced
    LWB: { x: 10, y: 75 },
    CB1: { x: 30, y: 75 },
    CB2: { x: 50, y: 75 },
    CB3: { x: 70, y: 75 },
    RWB: { x: 90, y: 75 },
    
    // 6th line - Goalkeeper
    GK: { x: 50, y: 90 },
  },
};