// src/core/types/user.types.ts

export type UserRole = 'SUPERADMIN' | 'PROPIETARIO';

export interface UserProfile {
  uid: string; // El ID de Firebase Auth
  email: string;
  role: UserRole;
  tenantId?: string; // ID del restaurante. Estrictamente necesario si es PROPIETARIO, nulo si eres tú (SUPERADMIN)
  isActive: boolean;
}