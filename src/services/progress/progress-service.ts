export class ProgessService {
  private _customCompletionPercentage = 0;
  private _nativeCompletionPercentage = 0;

  set customCompletionPercentage(percentage: number) {
    this._customCompletionPercentage = percentage;
  }

  get customCompletionPercentage() {
    return this._customCompletionPercentage;
  }

  set nativeCompletionPercentage(percentage: number) {
    this._nativeCompletionPercentage = percentage;
  }

  get nativeCompletionPercentage() {
    return this._nativeCompletionPercentage;
  }

  private getCompletionDelta(percentage: number) {
    const delta = Math.random() * 30;
    return Math.min(100, percentage + delta);
  }

  updateCustomCompletionPercentage() {
    this._customCompletionPercentage = this.getCompletionDelta(
      this._customCompletionPercentage,
    );
  }

  updateNativeCompletionPercentage() {
    this._nativeCompletionPercentage = this.getCompletionDelta(
      this._nativeCompletionPercentage,
    );
  }
}
