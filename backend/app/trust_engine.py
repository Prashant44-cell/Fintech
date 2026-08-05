import time
from typing import List, Tuple
from app.models import TrustSignalPayload, RiskLevel, AuthAction, TrustEvaluationResult

class ContinuousTrustEngine:
    def __init__(self):
        # Weights for trust signals (Behavior, Device, Context redistributing the 40% liveness weight)
        self.w_behavior = 0.35
        self.w_device = 0.35
        self.w_context = 0.30

    def evaluate_signals(self, payload: TrustSignalPayload, is_revoked: bool = False) -> TrustEvaluationResult:
        start_time = time.perf_counter()
        reasons: List[str] = []

        if is_revoked:
            latency = (time.perf_counter() - start_time) * 1000.0
            return TrustEvaluationResult(
                session_id=payload.session_id,
                trust_score=0.0,
                risk_level=RiskLevel.HIGH,
                recommended_action=AuthAction.REVOKE,
                reasons=["CREDENTIAL_REVOKED_BY_ADMIN"],
                latency_ms=round(latency, 3),
                timestamp=time.time()
            )

        # Weighted score calculation (0 to 100)
        raw_score = (
            (payload.behavior_sig * self.w_behavior) +
            (payload.device_sig * self.w_device) +
            (payload.context_sig * self.w_context)
        ) * 100.0

        # Evaluate risk level & action
        if raw_score >= 80.0:
            risk_level = RiskLevel.LOW
            action = AuthAction.ALLOW
            reasons.append("HIGH_DEVICE_TRUST_CONFIRMED")
            reasons.append("KNOWN_ATTESTED_DEVICE")
        elif raw_score >= 50.0:
            risk_level = RiskLevel.MEDIUM
            action = AuthAction.STEP_UP
            if payload.behavior_sig < 0.6:
                reasons.append("ANOMALOUS_KEYSTROKE_PATTERN")
            if payload.context_sig < 0.6:
                reasons.append("UNUSUAL_IP_OR_TIME")
            reasons.append("STEP_UP_CHALLENGE_REQUIRED")
        else:
            risk_level = RiskLevel.HIGH
            action = AuthAction.RESTRICT
            reasons.append("DEEPFAKE_OR_PROXY_ATTENDANCE_SUSPECTED")
            reasons.append("SESSION_TAKEOVER_RISK")

        latency = (time.perf_counter() - start_time) * 1000.0  # converted to milliseconds

        return TrustEvaluationResult(
            session_id=payload.session_id,
            trust_score=round(raw_score, 1),
            risk_level=risk_level,
            recommended_action=action,
            reasons=reasons,
            latency_ms=round(latency, 3),
            timestamp=time.time()
        )

trust_engine = ContinuousTrustEngine()
