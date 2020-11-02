declare enum statusTypes {
    LOADING = 0,
    SUCCESS = 1,
    FAILED = 2
}
declare function useController(_controller_group: any, _controller_name: any): [any, statusTypes];
export { useController, statusTypes };
